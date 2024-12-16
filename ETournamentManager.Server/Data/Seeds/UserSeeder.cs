namespace Data.Seeds
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.DependencyInjection;
    using Models;

    public class UserSeeder
    {
        public async static void Seed(IServiceProvider serviceProvider)
        {
            var hasher = new PasswordHasher<User>();
            using var scope = serviceProvider.CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<ETournamentManagerDbContext>();
            var role = dbContext.Roles.First(r => r.Name == "TOURNAMENT_PARTICIPANT");

            var userList = new List<User>();
            var roleList = new List<UserRole>();
            var teamList = new List<Team>();

            userList.AddRange([
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "gosho",
                    NormalizedUserName = "GOSHO",
                    Email = "gosho@test.test",
                    NormalizedEmail = "GOSHO@TEST.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "tosho",
                    NormalizedUserName = "TOSHO",
                    Email = "tosho@test.test",
                    NormalizedEmail = "TOSHO@TEST.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "losho",
                    NormalizedUserName = "LOSHO",
                    Email = "losho@test.test",
                    NormalizedEmail = "LOSHO@TEST.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "ivan",
                    NormalizedUserName = "IVAN",
                    Email = "ivan@test.test",
                    NormalizedEmail = "IVAN@TEST.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "NIKOLAY",
                    NormalizedUserName = "NIKOLAY",
                    Email = "NIKOLAY@test.test",
                    NormalizedEmail = "NIKOLAY@TEST.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "GEORGI",
                    NormalizedUserName = "GEORGI",
                    Email = "georgi@test.test",
                    NormalizedEmail = "GEORGI@TEST.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "VANKATA",
                    NormalizedUserName = "VANKATA",
                    Email = "vankata@test.test",
                    NormalizedEmail = "VANKATA@TEST.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "joro",
                    NormalizedUserName = "JORO",
                    Email = "joro@test.test",
                    NormalizedEmail = "JORO@TEST.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },

            ]);
            dbContext.Users.AddRange(userList);
            await dbContext.SaveChangesAsync();

            userList.ForEach(u =>
            {
                u.PasswordHash = hasher.HashPassword(u, "admin123");

                teamList.Add(new Team
                {
                    Name = u.UserName,
                    Tag = string.Empty,
                    IsPrivate = true
                });

                roleList.Add(new UserRole
                {
                    UserId = u.Id,
                    RoleId = role.Id
                });

            });

            dbContext.UserRoles.AddRange(roleList);

            dbContext.Teams.AddRange(teamList);
            await dbContext.SaveChangesAsync();


        }
    }
}
