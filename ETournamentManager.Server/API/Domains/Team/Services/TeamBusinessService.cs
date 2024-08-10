namespace API.Domains.Team.Services
{
    using Auth.Models;
    using Auth.Services;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Core.Exceptions;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;

    using static Core.Common.Constants.ErrorMessages;
    using static Core.Common.Constants.ErrorMessages.Team;
    using static Microsoft.AspNetCore.Http.StatusCodes;

    using Team = Data.Models.Team;

    public class TeamBusinessService(
        ETournamentManagerDbContext dbContext,
        IAuthService authService,
        IMapper mapper,
        ITeamDataService teamDataService) : ITeamBusinessService
    {
        private readonly CurrentUserModel currentUser = authService.GetCurrentUser();

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

        public async Task<string> Create(TeamManagementModel model)
        {
            Team team = new Team
            {
                Name = model.Name,
                Tag = model.Tag.ToUpper(),
                Description = model.Description,
            };

            await ValidationsCheck(model);

            team.Members.Add(new TeamMember
            {
                TeamId = team.Id,
                MemberId = Guid.Parse(currentUser.Id),
                IsCaptain = true
            });

            await dbContext.AddAsync(team);
            await dbContext.SaveChangesAsync();

            return team.Id.ToString();
        }

        public async Task Delete(string id)
        {
            Team? team = await teamDataService.GetById(id);

            if (team == null)
            {
                throw new BusinessServiceException(TEAM_NOT_FOUND, Status404NotFound);
            }

            if (!team.Members.First(m => m.IsCaptain).MemberId.Equals(Guid.Parse(currentUser.Id)))
            {
                throw new BusinessServiceException(USER_NOT_CAPTAIN, Status403Forbidden);
            }

            // TODO 
            //if (team.Tournaments.Count(t => !t.IsRequest && t.Tournament.HasFinished) > 0)
            //{
            //    throw new BusinessServiceException("Can not delete team that is in a tournament");
            //}

            if (team.Members.Count > 1)
            {
                throw new BusinessServiceException("Can not delete team that has members in it");
            }

            dbContext.Teams.Remove(team);
            await dbContext.SaveChangesAsync();
        }

        public async Task Edit(string id, TeamManagementModel model)
        {
            Team? team = await teamDataService.GetById(id);

            if (team == null)
            {
                throw new BusinessServiceException(TEAM_NOT_FOUND, Status404NotFound);
            }

            if (!team.Members.First(m => m.IsCaptain).MemberId.Equals(Guid.Parse(currentUser.Id)))
            {
                throw new BusinessServiceException(USER_NOT_CAPTAIN, Status403Forbidden);
            }

            await ValidationsCheck(model);

            team.Name = model.Name;
            team.Tag = model.Tag.ToUpper();
            team.Description = model.Description;

            dbContext.Teams.Update(team);
            await dbContext.SaveChangesAsync();
        }

        public async Task<ICollection<TeamListingModel>> GetAll(TeamQueryParamsModel queryParams)
        {
            ICollection<string> userIds = new HashSet<string>();

            if (queryParams.UserIds != null)
            {
                userIds = queryParams.UserIds.Split(", ").ToList();
            }

            IQueryable<Team> teams = dbContext.Teams.AsQueryable();

            if (userIds.Count > 0)
            {
                teams.Where(t => t.Members.Any(m => userIds.Contains(m.MemberId.ToString())));
            }

            return await teams
                .ProjectTo<TeamListingModel>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<TeamListingModel> GetById(string id)
        {
            Team? team = await teamDataService.GetById(id);

            if (team == null)
            {
                throw new BusinessServiceException(TEAM_NOT_FOUND, Status404NotFound);
            }

            return mapper.Map<TeamListingModel>(await teamDataService.GetById(id));
        }

        public async Task RemoveMember(TeamMemberModel model)
        {
            TeamMember? teamMember = await teamDataService.GetTeamMember(model.TeamId, model.MemberId);

            if (teamMember == null)
            {
                throw new BusinessServiceException("Member in team does not exist.", Status404NotFound);
            }

            if (teamMember.Team.Members.First(m => m.IsCaptain).MemberId != Guid.Parse(currentUser.Id)
                || teamMember.MemberId != Guid.Parse(currentUser.Id))
            {
                throw new BusinessServiceException("Only captain can remove a member, or member can leave the team", Status403Forbidden);
            }

            dbContext.Remove(teamMember);
            await dbContext.SaveChangesAsync();
        }

        private async Task ValidationsCheck(TeamManagementModel model)
        {
            if (model.Name == string.Empty)
            {
                throw new BusinessServiceException(
                    TEAM_NAME_EXISTS,
                    CLIENT_VALIDATION_ERROR_TITLE,
                    nameof(model.Name));
            }

            if (model.Tag == string.Empty)
            {
                throw new BusinessServiceException(
                    TEAM_NAME_EXISTS,
                    CLIENT_VALIDATION_ERROR_TITLE,
                    nameof(model.Name));
            }

            if (await teamDataService.ContainsName(model.Name))
            {
                throw new BusinessServiceException(
                    TEAM_NAME_EXISTS,
                    CLIENT_VALIDATION_ERROR_TITLE,
                    nameof(model.Name));
            }

            if (await teamDataService.ContainsTag(model.Tag))
            {
                throw new BusinessServiceException(
                    TEAM_TAG_EXISTS,
                    CLIENT_VALIDATION_ERROR_TITLE,
                    nameof(model.Tag));
            }
        }
    }
}
