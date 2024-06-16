namespace API.Domains.Team.Services
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class TeamBusinessService(
        ETournamentManagerDbContext dbContext,
        IMapper mapper,
        ITeamDataService teamDataService) : ITeamBusinessService
    {
        public async Task AddMember(TeamMemberModel model)
        {
            //TODO: Check if userManager.currentUserId == team.captainid

            if (await teamDataService.GetTeamMember(model.TeamId, model.MemberId) != null) return;

            await dbContext.TeamMembers.AddAsync(new TeamMember
            {
                TeamId = Guid.Parse(model.TeamId),
                MemberId = Guid.Parse(model.MemberId)
            });
            await dbContext.SaveChangesAsync();
        }

        public async Task Create(TeamManagementModel model)
        {
            Team team = new Team
            {
                Name = model.Name,
                Tag = model.Tag,
                Description = model.Description,
            };

            if (!await ValidationsCheck(model)) return;

            //TODO: Add captain to team

            await dbContext.AddAsync(team);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(string id)
        {
            Team? team = await teamDataService.GetById(id);

            if (team == null)
            {
                return;
            }
            // TODO: Check if tournament.creatorId == userManager.CurrentUserId


            dbContext.Teams.Remove(team);
            await dbContext.SaveChangesAsync();
        }

        public async Task Edit(string id, TeamManagementModel model)
        {
            Team? team = await teamDataService.GetById(id);

            if (team == null)
            {
                return;
            }

            if (!await ValidationsCheck(model)) return;

            // TODO: Check if team.captainId == userManager.CurrentUserId

            team.Name = model.Name;
            team.Tag = model.Tag;
            team.Description = model.Description;

            dbContext.Teams.Update(team);
            await dbContext.SaveChangesAsync();
        }

        public async Task<ICollection<TeamListingModel>> GetAll()
            => await dbContext
            .Teams
            .ProjectTo<TeamListingModel>(mapper.ConfigurationProvider)
            .ToListAsync();
        // TODO: Add NotFound error return
        public async Task<TeamListingModel> GetById(string id)
            => mapper.Map<TeamListingModel>(await teamDataService.GetById(id));

        public async Task RemoveMember(TeamMemberModel model)
        {
            //TODO: Check if userManager.currentUserId == team.captainid
            TeamMember? teamMember = await teamDataService.GetTeamMember(model.TeamId, model.MemberId);

            if (teamMember == null) return;

            dbContext.Remove(teamMember);
            await dbContext.SaveChangesAsync();
        }

        // TODO: Add validation message
        private async Task<bool> ValidationsCheck(TeamManagementModel model)
        {

            if (await teamDataService.ContainsName(model.Name)) return false;

            if (await teamDataService.ContainsTag(model.Tag)) return false;

            return true;
        }
    }
}
