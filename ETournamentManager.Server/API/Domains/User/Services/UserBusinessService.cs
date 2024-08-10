using AutoMapper.QueryableExtensions;

namespace API.Domains.User.Services
{
    using Auth.Models;
    using Auth.Services;
    using AutoMapper;
    using Core.Exceptions;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;

    using static Core.Common.Constants.ErrorMessages.Auth;
    using static Core.Common.Constants.Roles;

    public class UserBusinessService(
        ETournamentManagerDbContext dbContext,
        IAuthService authService,
        IMapper mapper) : IUserBusinessService
    {
        private readonly CurrentUserModel currentUser = authService.GetCurrentUser();

        public async Task<ICollection<UserListingModel>> GetAll(UserQueryParamsModel queryParams)
        {
            IQueryable<User> users = dbContext
                .Users
                .Where(u => u.Roles.First().Role.Name != ADMIN)
                .AsQueryable();

            if (queryParams.Role == null && (queryParams.Role == TOURNAMENT_CREATOR || queryParams.Role == TOURNAMENT_PARTICIPANT))
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
