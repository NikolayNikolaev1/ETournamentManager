﻿namespace API.Domains.Round.Services
{
    using AutoMapper;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Tournament.Services;
    using static Data.Models.Round;
    using static Data.Models.Tournament;

    public class RoundBusinessService(
        ETournamentManagerDbContext dbContext,
        IMapper mapper,
        ITournamentDataService tournamentDataService) : IRoundBusinessService
    {
        public async Task End(RoundWinnerModel model)
        {
            Round? round = await dbContext.Rounds.FirstOrDefaultAsync(r => r.Id.ToString() == model.RoundId);

            if (round == null)
            {
                // TODO: Add error
                return;
            }

            RoundTeam? roundTeam = await dbContext
                       .RoundTeams
                       .FirstOrDefaultAsync(rp => rp.RoundId == round.Id && rp.TeamId.ToString() == model.WinnerId);

            if (roundTeam == null)
            {
                // TODO: Add error message
                return;
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
                // TODO: add exception for no tournament
                return [];
            }

            // TODO: Add validation for tournament.CreatorId == userManager.currentUserId;

            if (tournament.Type == TournamentType.Team && tournament.Teams.Any(t => t.Team.Members.Count < tournament.MinTeamMembers))
            {
                // TODO: add exception for not enoght members in a team.
                return [];
            }

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
                    Tournament = tournament,
                };
                Round nextRound = new Round
                {
                    Stage = RoundStage.Semifinals,
                    Tournament = tournament,
                };

                /* For the first round of bracket creates new ID for next round.
                 * Then reuse it for the second round of bracket's next round,
                 *  after which deletes it to create another one for the next bracket part of rounds. */
                if (nextRoundId == Guid.Empty)
                {
                    nextRoundId = Guid.NewGuid();
                    nextRound.Id = nextRoundId;
                }
                else
                {
                    nextRound.Id = nextRoundId;
                    nextRoundId = Guid.Empty;
                }

                round.NextRound = nextRound;

                await dbContext.Rounds.AddAsync(round);

                RoundTeam firstTeam = new RoundTeam
                {
                    Team = teams.ElementAt(i),
                    Round = round
                };

                RoundTeam secondTeam = new RoundTeam
                {
                    Team = teams.ElementAt(i + 1),
                    Round = round
                };

                roundTeams.Add(firstTeam);
                roundTeams.Add(secondTeam);
                rounds.Add(round);
            }

            await dbContext.RoundTeams.AddRangeAsync(roundTeams);
            await dbContext.SaveChangesAsync();

            return mapper.Map<ICollection<RoundListingModel>>(rounds);
        }

        public async Task<ICollection<RoundListingModel>> GetAll(string tournamentId)
        {
            Tournament? tournament = await tournamentDataService.GetById(tournamentId);

            if (tournament == null)
            {
                // TODO: Add validation for no tournamnet;
                return [];
            }

            return mapper.Map<ICollection<RoundListingModel>>(tournament.Rounds);
        }
    }
}