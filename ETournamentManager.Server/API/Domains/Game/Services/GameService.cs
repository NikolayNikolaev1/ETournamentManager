namespace API.Domains.Game.Services
{
    using global::Data.Models;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Data;
    using Models;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class GameService(ETournamentManagerDbContext dbContext, IMapper mapper) : IGameService
    {
        public async Task<GameListingModel> Create(GameCreationViewModel game)
        {
            var newGame = await dbContext.Games.AddAsync(new Game
            {
                Name = game.Name
            });
            await dbContext.SaveChangesAsync();

            return new GameListingModel 
            {
                Id = newGame.Entity.Id.ToString(),
                Name = newGame.Entity.Name,
            };
        }

        public Task Delete(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<GameListingModel>> GetAll()
            => await dbContext
            .Games
            .ProjectTo<GameListingModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        public Task<GameListingModel> GetById(string id)
        {
            throw new NotImplementedException();
        }

        public Task Update(string id, GameCreationViewModel game)
        {
            throw new NotImplementedException();
        }
    }
}
