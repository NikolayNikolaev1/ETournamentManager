namespace API.Domains.Team.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface ITeamBusinessService : IService
    {
        Task<string> Create(TeamManagementModel model);

        Task Delete(string id);

        Task Edit(string id, TeamManagementModel model);

        Task<ICollection<TeamListingModel>> GetAll(TeamQueryParamsModel queryParams);

        Task<TeamListingModel> GetById(string id);

        Task<TeamListingModel> AddMember(TeamMemberModel model);

        Task<TeamListingModel> RemoveMember(TeamMemberModel model);
    }
}
