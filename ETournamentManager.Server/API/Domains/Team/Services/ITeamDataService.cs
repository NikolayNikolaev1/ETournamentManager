namespace API.Domains.Team.Services
{
    using Data.Models;

    public interface ITeamDataService
    {
        Task<bool> ContainsName(string name);

        Task<bool> ContainsTag(string tag);

        Task<Team?> GetById(string id);

        Task<TeamMember?> GetTeamMember(string teamId, string memberId);
    }
}
