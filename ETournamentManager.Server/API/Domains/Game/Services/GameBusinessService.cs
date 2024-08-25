namespace API.Domains.Game.Services
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Core.Exceptions;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using static Core.Common.Constants.ErrorMessages.Game;

    public class GameBusinessService(
        ETournamentManagerDbContext dbContext,
        IMapper mapper,
        IGameDataService gameDataService) : IGameBusinessService
    {
        public async Task Create(GameManagementModel model)
        {
            Game game = new Game
            {
                Name = model.Name
            };

            await dbContext.AddAsync(game);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(string id)
        {
            Game? game = await gameDataService.GetById(id);

            if (game == null)
            {
                throw new BusinessServiceException(GAME_NOT_FOUND, StatusCodes.Status404NotFound);
            }

            dbContext.Games.Remove(game);
            await dbContext.SaveChangesAsync();
        }

        public async Task Edit(string id, GameManagementModel model)
        {
            Game? game = await gameDataService.GetById(id);

            if (game == null)
            {
                throw new BusinessServiceException(GAME_NOT_FOUND, StatusCodes.Status404NotFound);
            }

            game.Name = model.Name;

            dbContext.Games.Update(game);
            await dbContext.SaveChangesAsync();
        }

        public async Task<ICollection<GameListingModel>> GetAll(GameQueryParamsModel queryParams)
        {
            IQueryable<Game> games = dbContext.Games.AsQueryable();


            if (queryParams.Search != null)
            {
                games = games.Where(t => t.Name.ToLower().Contains(queryParams.Search.ToLower()));
            }

            return await games
                .ProjectTo<GameListingModel>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<GameListingModel> GetById(string id)
            => mapper.Map<GameListingModel>(await gameDataService.GetById(id));
    }
}
