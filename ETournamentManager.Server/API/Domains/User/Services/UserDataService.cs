namespace API.Domains.User.Services
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;

    public class UserDataService(ETournamentManagerDbContext dbContext) : IUserDataService
    {
        public async Task<ICollection<User>> GetAllByRoleName(string roleName)
            => await dbContext.Users
            .Include(u => u.Roles)
            .ThenInclude(r => r.Role)
            .Where(u => u.Roles.Select(r => r.Role.Name).Contains(roleName))
            .ToListAsync();

        public async Task<User?> GetById(string id)
            => await dbContext.Users.FirstOrDefaultAsync(u => u.Id.Equals(Guid.Parse(id)));
    }
}
