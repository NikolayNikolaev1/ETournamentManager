﻿namespace API.Domains.Team.Services
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

            await ValidationsCheck(model);

            // TODO: Check if team.captainId == userManager.CurrentUserId

            team.Name = model.Name;
            team.Tag = model.Tag.ToUpper();
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
