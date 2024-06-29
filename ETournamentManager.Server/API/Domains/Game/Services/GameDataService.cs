namespace API.Domains.Game.Services
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class GameDataService(ETournamentManagerDbContext dbContext) : IGameDataService
    {
        public async Task<Game?> GetById(string id)
            => await dbContext.Games.FirstOrDefaultAsync(g => g.Id.ToString() == id);
    }
}
