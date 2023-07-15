namespace Services.Implementations
{
    using Core;
    using Data;
    using DTO.User;
    using Microsoft.EntityFrameworkCore;

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext dbContext;

        public UserService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> ContainsEmailAsync(string email)
            => await this.dbContext.Users.AnyAsync(u => u.Email.Equals(email));


        public async Task<UserDTO> CreateAsync(string email, string password)
        {
            UserManager userManager = new UserManager(email, password);

            User user = new User
            {
                Email = email,
                Password = userManager.HashedPassword
            };

            await this.dbContext.Users.AddAsync(user);
            await this.dbContext.SaveChangesAsync();

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email
            };
        }
    }
}
