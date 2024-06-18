namespace API.Domains.Round.Services
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
        public async Task<ICollection<RoundListingModel>> Generate(string tournamentId)
        {
            Tournament? tournament = await tournamentDataService.GetById(tournamentId);

            if (tournament == null)
            {
                // TODO: add exception for no tournament
                return [];
            }

            // TODO: Add validation for tournament.CreatorId == userManager.currentUserId;

            if (tournament.Type == TournamentType.Team && tournament.MinTeamMembers > tournament.Teams.Count)
            {
                // TODO: add exception for not enoght teams.
                return [];
            }

            tournament.Active = true;

            Random rnd = new Random();
            ICollection<Team> teams = tournament
                .Teams
                .Select(tt => tt.Team)
                .OrderBy(t => rnd.Next())
                .ToList();
            ICollection<User> players = tournament
                .Players
                .Select(tt => tt.Player)
                .OrderBy(t => rnd.Next())
                .ToList();

            ICollection<Round> rounds = new HashSet<Round>();
            ICollection<RoundPlayer> roundPlayers = new HashSet<RoundPlayer>();
            ICollection<RoundTeam> roundTeams = new HashSet<RoundTeam>();


            switch (tournament.Type)
            {
                case TournamentType.SinglePlayer:
                    for (int i = 1; i <= teams.Count; i += 2)
                    {
                        Round round = new Round
                        {
                            Type = RoundType.Quarterfinals,
                            Tournament = tournament,
                        };

                        await dbContext.Rounds.AddAsync(round);

                        RoundPlayer firstPlayer = new RoundPlayer
                        {
                            Player = players.ElementAt(i),
                            Round = round
                        };

                        RoundPlayer secondPlayer = new RoundPlayer
                        {
                            Player = players.ElementAt(i + 1),
                            Round = round
                        };

                        roundPlayers.Add(firstPlayer);
                        roundPlayers.Add(secondPlayer);
                        rounds.Add(round);
                    }
                    break;
                case TournamentType.Team:
                    for (int i = 1; i <= teams.Count; i += 2)
                    {

                        Round round = new Round
                        {
                            Type = RoundType.Quarterfinals,
                            Tournament = tournament,
                        };

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
                    break;
            }

            await dbContext.RoundTeams.AddRangeAsync(roundTeams);
            await dbContext.RoundPlayers.AddRangeAsync(roundPlayers);

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
