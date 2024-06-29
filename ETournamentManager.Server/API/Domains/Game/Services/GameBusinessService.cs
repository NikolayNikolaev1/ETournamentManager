namespace API.Domains.Game.Services
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class GameBusinessService(
        ETournamentManagerDbContext dbContext,
        IMapper mapper,
        IGameDataService gameDataService) : IGameBusinessService
    {
        public async Task Create(GameManagementModel model)
        {
            // TODO: Check if userManager.CurrentUser.Role == ADMIN;

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
                return;
            }

            // TODO: Check if userManager.CurrentUser.Role == ADMIN;


            dbContext.Games.Remove(game);
            await dbContext.SaveChangesAsync();
        }

        public async Task<ICollection<GameListingModel>> GetAll()
            => await dbContext
            .Games
            .ProjectTo<GameListingModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        public async Task<GameListingModel> GetById(string id)
            => mapper.Map<GameListingModel>(await gameDataService.GetById(id));

        public async Task Update(string id, GameManagementModel model)
        {
            Game? game = await gameDataService.GetById(id);

            if (game == null)
            {
                return;
            }

            // TODO: Check if userManager.CurrentUser.ROle == ADMIN

            game.Name = model.Name;

            dbContext.Games.Update(game);
            await dbContext.SaveChangesAsync();
        }
    }
}
