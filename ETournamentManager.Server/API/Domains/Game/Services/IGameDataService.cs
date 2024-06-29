namespace API.Domains.Game.Services
{
    using Data.Models;

    public interface IGameDataService
    {
        Task<Game?> GetById(string id);
    }
}
