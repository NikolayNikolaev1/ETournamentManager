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

        public async Task<bool> ContainsIdAsync(int id)
            => await this.dbContext.Users.AnyAsync(u => u.Id.Equals(id));

        public async Task<UserDTO> CreateAsync(string email, string password)
        {
            User user = new User
            {
                Email = email,
                PasswordHash = PasswordManager.HashPassword(password, out byte[] salt),
                HashSalt = salt
            };

            await this.dbContext.Users.AddAsync(user);
            await this.dbContext.SaveChangesAsync();

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email
            };
        }

        public async Task<UserDTO> FindEmailAsync(string email)
        {
            User user = await this.dbContext.Users.FirstAsync(u => u.Email == email);

            return new UserDTO { Id = user.Id, Email = user.Email };
        }

        public async Task<UserDTO> FindIdAsync(int id)
        {
            User user = await this.dbContext.Users.FirstAsync(u => u.Id == id);

            return new UserDTO { Id = user.Id, Email = user.Email };
        }

        public async Task<UserHashDTO> GetHashAsync(int id)
        {
            User user = await this.dbContext.Users.FirstAsync(u => u.Id == id);

            return new UserHashDTO { Password = user.PasswordHash, Salt = user.HashSalt };
        }
    }
}
