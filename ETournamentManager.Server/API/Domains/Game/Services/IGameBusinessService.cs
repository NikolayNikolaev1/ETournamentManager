namespace API.Domains.Game.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface IGameBusinessService : IService
    {
        Task Create(GameManagementModel model);

        Task Delete(string id);

        Task Edit(string id, GameManagementModel nidek);

        Task<ICollection<GameListingModel>> GetAll();

        Task<GameListingModel> GetById(string id);
    }
}
