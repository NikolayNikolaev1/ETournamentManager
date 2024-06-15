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
            .FirstOrDefaultAsync(t => t.Id == Guid.Parse(id));

        public async Task<TournamentPlayer?> GetTournamentPlayer(string tournamentId, string playerId)
            => await dbContext
            .TournamentPlayers
            .FirstOrDefaultAsync(tp => tp.TournamentId == Guid.Parse(tournamentId)
                && tp.PlayerId == Guid.Parse(playerId));

        public Task<TournamentTeam?> GetTournamentTeam(string tournamentId, string teamId)
        {
            throw new NotImplementedException();
        }
    }
}
