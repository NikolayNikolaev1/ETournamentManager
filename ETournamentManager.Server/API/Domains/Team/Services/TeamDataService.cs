namespace API.Domains.Team.Services
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class TeamDataService(ETournamentManagerDbContext dbContext) : ITeamDataService
    {
        public async Task<bool> ContainsName(string name, string id)
            => await dbContext.Teams.AnyAsync(t => t.Name == name && t.Id.ToString() != id);

        public async Task<bool> ContainsTag(string tag, string id)
            => await dbContext.Teams.AnyAsync(t => t.Tag == tag && t.Id.ToString() != id);

        public async Task<Team?> GetById(string id)
            => await dbContext
            .Teams
            .Include(t => t.Members)
            .ThenInclude(m => m.Member)
            .Include(t => t.Tournaments)
            .ThenInclude(t => t.Tournament)
            .FirstOrDefaultAsync(t => t.Id.ToString() == id);

        public async Task<TeamMember?> GetTeamMember(string teamId, string memberId)
            => await dbContext
            .TeamMembers
            .FirstOrDefaultAsync(tm => tm.TeamId.Equals(Guid.Parse(teamId)) && tm.MemberId.Equals(Guid.Parse(memberId)));
    }
}
