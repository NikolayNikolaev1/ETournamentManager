namespace API.Domains.User.Services
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class UserDataService(ETournamentManagerDbContext dbContext) : IUserDataService
    {
        public async Task<User?> GetById(string id)
            => await dbContext.Users.FirstOrDefaultAsync(u => u.Id.Equals(Guid.Parse(id)));
    }
}
