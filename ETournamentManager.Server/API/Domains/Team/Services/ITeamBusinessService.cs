namespace API.Domains.Team.Services
{
    using API.Domains.User.Models;
    using Core.Common.Data.Interfaces;
    using Models;

    public interface ITeamBusinessService : IService
    {
        Task<TeamBaseModel> Create(TeamManagementModel model);

        Task Delete(string id);

        Task<TeamBaseModel> Edit(string id, TeamManagementModel model);

        Task<ICollection<TeamListingModel>> GetAll(TeamQueryParamsModel queryParams);

        Task<TeamListingModel> GetById(string id);

        Task<UserBaseModel> AddMember(TeamMemberModel model);

        Task<TeamListingModel> RemoveMember(TeamMemberModel model);
    }
}
