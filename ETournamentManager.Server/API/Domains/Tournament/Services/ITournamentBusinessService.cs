namespace API.Domains.Tournament.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface ITournamentBusinessService : IService
    {
        Task<string> Create(TournamentManagementModel model);

        Task Delete(string id);

        Task Edit(string id, TournamentManagementModel model);

        Task<ICollection<TournamentListingModel>> GetAll(TournamentQueryParams queryParams);

        Task<ICollection<TournamentRoundsModel>> GetAllWithRounds();

        Task<TournamentListingModel> GetById(string id);

        Task<TournamentListingModel> Join(TournamentTeamModel model);

        Task Leave(TournamentTeamModel model);
    }
}
