namespace API.Domains.Game.Services
{
    using Core.Common.Data.Interfaces;
    using Data.Models;

    public interface IGameDataService : IService
    {
        Task<bool> ContainsId(string id);

        Task<Game?> GetById(string id);
    }
}
