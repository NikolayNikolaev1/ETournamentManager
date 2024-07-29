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

    using static Core.Common.Constants.ErrorMessages.Auth;

    public class UserBusinessService(
        ETournamentManagerDbContext dbContext,
        IAuthService authService,
        IMapper mapper) : IUserBusinessService
    {
        private readonly CurrentUserModel currentUser = authService.GetCurrentUser();

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
