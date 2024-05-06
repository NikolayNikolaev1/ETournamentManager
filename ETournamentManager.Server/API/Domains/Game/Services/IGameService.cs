namespace API.Domains.Game.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface IGameService : IService
    {
        Task<GameListingViewModel> Create(GameCreationViewModel game);

        Task Delete(string id);

        Task Update(string id, GameCreationViewModel game);

        Task<ICollection<GameListingViewModel>> GetAll();

        Task<GameListingViewModel> GetById(string id);
    }
}
