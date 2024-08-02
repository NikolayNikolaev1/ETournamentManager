namespace API.Domains.Game.Services
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class GameDataService(ETournamentManagerDbContext dbContext) : IGameDataService
    {
        public async Task<bool> ContainsId(string id)
            => await dbContext.Games.AnyAsync(g => g.Id.Equals(Guid.Parse(id)));

        public async Task<Game?> GetById(string id)
            => await dbContext.Games.FirstOrDefaultAsync(g => g.Id.Equals(Guid.Parse(id)));
    }
}
