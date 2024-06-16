namespace API.Domains.Team.Services
{
    using Models;

    public interface ITeamBusinessService
    {
        Task Create(TeamManagementModel model);

        Task Delete(string id);

        Task Edit(string id, TeamManagementModel model);

        Task<ICollection<TeamListingModel>> GetAll();

        Task<TeamListingModel> GetById(string id);

        Task AddMember(TeamMemberModel model);

        Task RemoveMember(TeamMemberModel model);
    }
}
