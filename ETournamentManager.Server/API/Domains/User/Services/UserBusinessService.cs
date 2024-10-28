using AutoMapper.QueryableExtensions;

namespace API.Domains.User.Services
{
    using Auth.Models;
    using Auth.Services;
    using AutoMapper;
    using Core.Exceptions;
    using Data;
    using Data.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;

    using static Core.Common.Constants.ErrorMessages.Auth;
    using static Core.Common.Constants.Roles;

    public class UserBusinessService(
        ETournamentManagerDbContext dbContext,
        UserManager<User> userManager,
        IAuthService authService,
        IUserDataService userDataService,
        IMapper mapper) : IUserBusinessService
    {
        private readonly CurrentUserModel currentUser = authService.GetCurrentUser();

        public async Task<ICollection<UserListingModel>> GetAll(UserQueryParamsModel queryParams)
        {
            ICollection<string> teamIds = new HashSet<string>();

            if (queryParams.TeamIds != null)
            {
                teamIds = queryParams.TeamIds.Split(", ").ToList();
            }


            IQueryable<User> users = dbContext
                .Users
                .Include(u => u.Teams)
                .Where(u => u.Roles.First().Role.Name != ADMIN)
                .AsQueryable();


            if (teamIds.Count > 0)
            {
                users = users.Where(u => u.Teams.Select(t => t.TeamId).Any(id => teamIds.Contains(id.ToString())));
            }

            if (queryParams.Role != null && (queryParams.Role == TOURNAMENT_CREATOR || queryParams.Role == TOURNAMENT_PARTICIPANT))
            {
                users = users.Where(u => u.Roles.First().Role.Name == queryParams.Role);
            }

            if (queryParams.Search != null && queryParams.Search.Trim().Length > 0)
            {
                users = users.Where(u => u.UserName!.Contains(queryParams.Search));
            }

            return await users
                .ProjectTo<UserListingModel>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task EditUsername(string userName)
        {
            User? user = await userDataService.GetById(currentUser.Id);

            if (user == null)
            {
                throw new BusinessServiceException(USER_NOT_FOUND);
            }

            await userManager.SetUserNameAsync(user, userName);
            await userManager.UpdateNormalizedUserNameAsync(user);
        }

        public async Task<UserProfileModel> GetProfile()
        {
            User? user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id.ToString() == currentUser.Id);

            if (user == null)
            {
                throw new BusinessServiceException(NOT_AUTHENTICATED, StatusCodes.Status404NotFound);
            }

            UserProfileModel profile = mapper.Map<UserProfileModel>(user);
            profile.RoleName = currentUser.RoleName;

            return profile;
        }
    }
}
