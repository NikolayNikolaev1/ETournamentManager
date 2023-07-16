namespace Services.Implementations
{
    using Core;
    using Data;
    using DTO.User;
    using Microsoft.EntityFrameworkCore;

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IUserManager userManager;

        public UserService(ApplicationDbContext dbContext, IUserManager userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        public async Task<bool> ContainsEmailAsync(string email)
            => await this.dbContext.Users.AnyAsync(u => u.Email.Equals(email));


        public async Task<UserDTO> CreateAsync(string email, string password)
        {
            this.userManager.Register(email, password);

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

        public async Task<UserDTO> FindIdAsync(int id)
        {
            User user = await this.dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            return new UserDTO { Id = user.Id, Email = user.Email };
        }
    }
}
