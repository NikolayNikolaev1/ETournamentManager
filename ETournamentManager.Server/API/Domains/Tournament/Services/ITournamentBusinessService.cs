namespace API.Domains.Tournament.Services
{
    using API.Domains.Team.Models;
    using Core.Common.Data.Interfaces;
    using Models;

    public interface ITournamentBusinessService : IService
    {
        Task<TournamentBaseModel> Create(TournamentManagementModel model);

        Task Delete(string id);

        Task<TournamentBaseModel> Edit(string id, TournamentManagementModel model);

        Task Finish(string id);

        Task<ICollection<TournamentListingModel>> GetAll(TournamentQueryParams queryParams);

        Task<ICollection<TournamentRoundsModel>> GetAllWithRounds();

        Task<TournamentListingModel> GetById(string id);

        Task<TeamBaseModel> Join(TournamentTeamModel model);

        Task Leave(TournamentTeamModel model);
    }
}
