namespace API.Domains.Game.Services
{
    using Core.Common.Data;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class GameDataService(ETournamentManagerDbContext dbContext)
        : DataService<Game>(dbContext), IGameDataService
    {
        public async Task<Game?> GeyById(string id)
            => await DbSet.FirstOrDefaultAsync(g => g.Id == new Guid(id));
    }
}
