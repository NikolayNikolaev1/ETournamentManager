namespace API.Domains.Tournament.Services
{
    using Core.Common.Data.Interfaces;
    using Data.Models;

    public interface ITournamentDataService : IService
    {
        Task<Tournament?> GetById(string id);

        Task<TournamentTeam?> GetTournamentTeam(string tournamentId, string teamId);
    }
}
