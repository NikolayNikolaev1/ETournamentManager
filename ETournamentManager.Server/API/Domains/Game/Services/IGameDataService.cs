namespace API.Domains.Game.Services
{
    using Core.Common.Data.Interfaces;
    using Data.Models;

    public interface IGameDataService : IDataService<Game>, IService
    {
        Task<Game?> GeyById(string id);
    }
}
