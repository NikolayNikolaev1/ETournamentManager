namespace API.Domains.Round.Services
{
    using Auth.Models;
    using Auth.Services;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Core.Exceptions;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Azure;
    using Models;
    using Tournament.Services;

    using static Data.Models.Round;
    using static Data.Models.Tournament;
    using static Microsoft.AspNetCore.Http.StatusCodes;

    public class RoundBusinessService(
        ETournamentManagerDbContext dbContext,
        IMapper mapper,
        IAuthService authService,
        ITournamentDataService tournamentDataService) : IRoundBusinessService
    {
        private readonly CurrentUserModel currentUser = authService.GetCurrentUser();

        public async Task End(RoundWinnerModel model)
        {
            Round? round = await dbContext.Rounds.FirstOrDefaultAsync(r => r.Id.ToString() == model.RoundId);

            if (round == null)
            {
                throw new BusinessServiceException("Round not found", Status404NotFound);
            }

            RoundTeam? roundTeam = await dbContext
                       .RoundTeams
                       .FirstOrDefaultAsync(rp => rp.RoundId == round.Id && rp.TeamId.ToString() == model.WinnerId);

            if (roundTeam == null)
            {
                throw new BusinessServiceException("RoundTeam not found", Status404NotFound);
            }

            roundTeam.IsWinner = true;

            if (round.Stage != RoundStage.Finals)
            {
                RoundTeam nextRoundTeam = new RoundTeam
                {
                    Round = round.NextRound!,
                    Team = roundTeam.Team
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

            if (tournament.CreatorId != Guid.Parse(currentUser.Id))
            {
                throw new BusinessServiceException("Only tournament creator can start tournament", Status401Unauthorized);
            }

            if (tournament.Teams.Count != 8)
            {
                throw new BusinessServiceException("Eight teams arethe min for tournament to start.");
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

            for (int i = 1; i <= teams.Count; i += 2)
            {
                Round round = new Round
                {
                    Stage = RoundStage.Quarterfinals,
                    TournamentId = tournament.Id,
                };
                Round nextRound = new Round
                {
                    Stage = RoundStage.Semifinals,
                    TournamentId = tournament.Id,
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

            return mapper.Map<ICollection<RoundListingModel>>(rounds);
        }

        public async Task<ICollection<RoundListingModel>> GetAll(string tournamentId)
        {
            Tournament? tournament = await tournamentDataService.GetById(tournamentId);

            if (tournament == null)
            {
                throw new BusinessServiceException("Tournament not found", Status404NotFound);
            }

            ICollection<RoundListingModel> rounds = new List<RoundListingModel>();

            tournament.Rounds.ToList().ForEach(r => rounds.Add(mapper.Map<RoundListingModel>(r)));

            return rounds;
        }
    }
}
