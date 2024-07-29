namespace API.Domains.Team.Services
{
    using Core.Common.Data.Interfaces;
    using Data.Models;

    public interface ITeamDataService : IService
    {
        Task<bool> ContainsName(string name);

        Task<bool> ContainsTag(string tag);

        Task<Team?> GetById(string id);

        Task<TeamMember?> GetTeamMember(string teamId, string memberId);
    }
}
