namespace API.Domains.Tournament.Services
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class TournamentDataService(ETournamentManagerDbContext dbContext) : ITournamentDataService
    {
        public async Task<Tournament?> GetById(string id)
            => await dbContext
            .Tournaments
            .Include(t => t.Game)
            .Include(t => t.Creator)
            .Include(t => t.Teams)
            .ThenInclude(t => t.Team)
            .Include(t => t.Rounds)
            .FirstOrDefaultAsync(t => t.Id == Guid.Parse(id));

        public async Task<TournamentTeam?> GetTournamentTeam(string tournamentId, string teamId)
            => await dbContext
            .TournamentTeams
            .Include(tt => tt.Tournament)
            .Include(tt => tt.Team)
            .ThenInclude(t => t.Members)
            .FirstOrDefaultAsync(tp => tp.TournamentId.ToString() == tournamentId && tp.TeamId.ToString() == teamId);
    }
}
