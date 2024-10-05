namespace API.Domains.Round.Services
{
    using Auth.Models;
    using Auth.Services;
    using AutoMapper;
    using Core.Exceptions;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Tournament.Services;

    using static Core.Common.Constants.ErrorMessages;
    using static Core.Common.Constants.Roles;
    using static Data.Models.Round;
    using static Microsoft.AspNetCore.Http.StatusCodes;

    using Team = Data.Models.Team;
    using Tournament = Data.Models.Tournament;

    public class RoundBusinessService(
        ETournamentManagerDbContext dbContext,
        IMapper mapper,
        IAuthService authService,
        ITournamentDataService tournamentDataService) : IRoundBusinessService
    {
        private readonly CurrentUserModel currentUser = authService.GetCurrentUser();

        public async Task End(RoundWinnerModel model)
        {
            Round? round = await dbContext
                .Rounds
                .Include(r => r.Tournament)
                .Include(r => r.NextRound)
                .FirstOrDefaultAsync(r => r.Id.ToString() == model.RoundId);

            if (round == null)
            {
                throw new BusinessServiceException("Round not found", Status404NotFound);
            }

            RoundTeam? roundTeam = await dbContext
                       .RoundTeams
                       .FirstOrDefaultAsync(rp => rp.RoundId == round.Id && rp.TeamId == Guid.Parse(model.WinnerId));

            if (roundTeam == null)
            {
                throw new BusinessServiceException("RoundTeam not found", Status404NotFound);
            }

            bool hasNextRoundWinner = round.NextRound?.Teams.Any(t => t.IsWinner) ?? false;

            if (hasNextRoundWinner)
            {
                throw new BusinessServiceException("Can not change winner if next round has already a winner");
            }

            RoundTeam opponentRoundTeam = await dbContext
                       .RoundTeams
                       .FirstAsync(rp => rp.RoundId == round.Id && rp.TeamId != Guid.Parse(model.WinnerId));

            roundTeam.IsWinner = true;
            opponentRoundTeam.IsWinner = false;

            if (round.Stage != RoundStage.Finals)
            {
                RoundTeam? opponentNextRoundTeam = await dbContext
                    .RoundTeams
                    .Include(rt => rt.Round)
                    .FirstOrDefaultAsync(rt => rt.RoundId == round.NextRoundId
                        && rt.TeamId == opponentRoundTeam.TeamId);

                if (opponentNextRoundTeam != null)
                {
                    bool isNextRoundFinished = await dbContext
                        .RoundTeams
                        .AnyAsync(rt => rt.RoundId == opponentNextRoundTeam.RoundId
                            && rt.IsWinner);

                    if (isNextRoundFinished)
                    {
                        throw new BusinessServiceException("Can not change round winner when next round is finished.");
                    }

                    dbContext.RoundTeams.Remove(opponentNextRoundTeam);
                }

                RoundTeam nextRoundTeam = new RoundTeam
                {
                    RoundId = Guid.Parse(round.NextRoundId.ToString()!), // TODO: Fix this conversion.
                    TeamId = roundTeam.TeamId
                };
                await dbContext.RoundTeams.AddAsync(nextRoundTeam);
            }
            else
            {
                round.Tournament.Active = false;
            }

            await dbContext.SaveChangesAsync();
        }

        public async Task<ICollection<RoundListingModel>> Generate(string tournamentId)
        {
            Tournament? tournament = await tournamentDataService.GetById(tournamentId);

            if (tournament == null)
            {
                throw new BusinessServiceException("Tournament not found", Status404NotFound);
            }

            if (tournament.CreatorId != Guid.Parse(currentUser.Id) || currentUser.RoleName == ADMIN)
            {
                throw new BusinessServiceException("Only tournament creator can start tournament", Status401Unauthorized);
            }

            if (tournament.Teams.Count != 8)
            {
                throw new BusinessServiceException("Eight teams are the min for tournament to start.", CLIENT_VALIDATION_ERROR_TITLE, "Team count");
            }

            //if (tournament.Type == TournamentType.Team && tournament.Teams.Any(t => t.Team.Members.Count < tournament.MinTeamMembers))
            //{
            //    throw new BusinessServiceException("There are teams with not the min team members in it");
            //}

            tournament.Active = true;

            Random rnd = new Random();
            ICollection<Team> teams = tournament
                .Teams
                .Select(tt => tt.Team)
                .OrderBy(t => rnd.Next())
                .ToList();

            ICollection<Round> rounds = new HashSet<Round>();
            ICollection<RoundTeam> roundTeams = new HashSet<RoundTeam>();

            Guid nextRoundId = Guid.Empty;
            Guid finalsRoundId = Guid.NewGuid();

            rounds.Add(new Round
            {
                Id = finalsRoundId,
                Stage = RoundStage.Finals,
                TournamentId = Guid.Parse(tournamentId)
            });

            for (int i = 1; i <= teams.Count; i += 2)
            {
                Round round = new Round
                {
                    Stage = RoundStage.Quarterfinals,
                    TournamentId = Guid.Parse(tournamentId)
                };
                Round nextRound = new Round
                {
                    Stage = RoundStage.Semifinals,
                    TournamentId = Guid.Parse(tournamentId),
                    NextRoundId = finalsRoundId
                };

                /* For the first round of bracket creates new ID for next round.
                 * Then reuse it for the second round of bracket's next round,
                 *  after which deletes it to create another one for the next bracket part of rounds. */
                if (nextRoundId == Guid.Empty)
                {
                    nextRoundId = Guid.NewGuid();
                    nextRound.Id = nextRoundId;
                    rounds.Add(nextRound);
                }
                else
                {
                    nextRound.Id = nextRoundId;
                    nextRoundId = Guid.Empty;
                }

                round.NextRoundId = nextRound.Id;

                //await dbContext.Rounds.AddAsync(round);

                RoundTeam firstTeam = new RoundTeam
                {
                    TeamId = teams.ElementAt(i - 1).Id,
                    RoundId = round.Id
                };

                RoundTeam secondTeam = new RoundTeam
                {
                    TeamId = teams.ElementAt(i).Id,
                    RoundId = round.Id
                };

                roundTeams.Add(firstTeam);
                roundTeams.Add(secondTeam);
                rounds.Add(round);
            }

            await dbContext.Rounds.AddRangeAsync(rounds);
            await dbContext.RoundTeams.AddRangeAsync(roundTeams);
            await dbContext.SaveChangesAsync();

            return mapper.Map<ICollection<RoundListingModel>>(rounds
                .OrderByDescending(r => r.Stage)
                .ThenBy(r => r.NextRoundId)
                .ToList());
        }

        public async Task<ICollection<RoundListingModel>> GetAll(string tournamentId)
        {
            Tournament? tournament = await tournamentDataService.GetById(tournamentId);

            if (tournament == null)
            {
                throw new BusinessServiceException("Tournament not found", Status404NotFound);
            }

            ICollection<Round> rounds = tournament
                .Rounds
                .OrderByDescending(r => r.Stage)
                .ThenBy(r => r.NextRoundId)
                .ToList();
            // TODO: Fix ordering after nextRoundId.

            return mapper.Map<ICollection<RoundListingModel>>(rounds);
        }
    }
}
