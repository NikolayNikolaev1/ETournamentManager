namespace API.Domains.Tournament.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface ITournamentBusinessService : IService
    {
        Task Create(TournamentManagementModel model);

        Task Delete(string id);

        Task Edit(string id, TournamentManagementModel model);

        Task<ICollection<TournamentListingModel>> GetAll(TournamentQueryParams queryParams);

        Task<TournamentListingModel> GetById(string id);

        Task Join(TournamentTeamModel model);

        Task Leave(TournamentTeamModel model);
    }
}
