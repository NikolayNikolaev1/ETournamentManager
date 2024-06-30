namespace API.Domains.Game.Services
{
    using Core.Common.Data.Interfaces;
    using Data.Models;

    public interface IGameDataService : IService
    {
        Task<Game?> GetById(string id);
    }
}
