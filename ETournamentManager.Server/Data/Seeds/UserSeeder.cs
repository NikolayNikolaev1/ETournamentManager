namespace Data.Seeds
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using Models;

    public class UserSeeder
    {
        public async static Task Seed(IServiceProvider serviceProvider)
        {
            var hasher = new PasswordHasher<User>();
            using var scope = serviceProvider.CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<ETournamentManagerDbContext>();
            var participantRole = await dbContext.Roles.FirstAsync(r => r.Name == "TOURNAMENT_PARTICIPANT");
            var creatorRole = await dbContext.Roles.FirstAsync(r => r.Name == "TOURNAMENT_CREATOR");

            var userList = new List<User>();
            var creatorList = new List<User>();
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
            creatorList.AddRange([
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "tu_varna_programming",
                    NormalizedUserName = "TU_VARNA_PROGRAMMING",
                    Email = "programing-org@tu-varna.test",
                    NormalizedEmail = "PROGRAMMING-ORG@TU-VARNA.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "tu_varna_sports",
                    NormalizedUserName = "TU_VARNA_SPORTS",
                    Email = "sports-org@tu-varna.test",
                    NormalizedEmail = "SPORTS-ORG@TU-VARNA.TEST",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = Guid.NewGuid().ToString("D")
                },
                ]);
            await dbContext.Users.AddRangeAsync(userList);
            await dbContext.Users.AddRangeAsync(creatorList);
            await dbContext.SaveChangesAsync();

            userList.ForEach(u =>
            {
                u.PasswordHash = hasher.HashPassword(u, "test123");

                teamList.Add(new Team
                {
                    Name = u.UserName,
                    Tag = string.Empty,
                    IsPrivate = true
                });

                roleList.Add(new UserRole
                {
                    UserId = u.Id,
                    RoleId = participantRole.Id
                });
            });

            creatorList.ForEach(u =>
            {
                u.PasswordHash = hasher.HashPassword(u, "test123");


                roleList.Add(new UserRole
                {
                    UserId = u.Id,
                    RoleId = creatorRole.Id
                });
            });

            await dbContext.UserRoles.AddRangeAsync(roleList);

            await dbContext.Teams.AddRangeAsync(teamList);
            await dbContext.SaveChangesAsync();
        }
    }
}
