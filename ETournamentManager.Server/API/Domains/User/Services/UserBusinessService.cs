namespace API.Domains.User.Services
{
    using Auth.Models;
    using Auth.Services;
    using AutoMapper;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;

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
                // TODO: Error
                //return;
            }

            return mapper.Map<UserProfileModel>(user);
        }
    }
}
