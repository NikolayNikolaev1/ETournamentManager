namespace Data.Seeds
{
    using Models;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.EntityFrameworkCore;

    public class TournamentSeeder
    {
        public static async Task Seed(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<ETournamentManagerDbContext>();

            var programmingCreator = await dbContext.Users.FirstAsync(u => u.UserName == "tu_varna_programming");
            var sportsCreator = await dbContext.Users.FirstAsync(u => u.UserName == "tu_varna_sports");
            var programmingGame = await dbContext.Games.FirstAsync(g => g.Name == "Програмиране");

            await dbContext.Tournaments.AddRangeAsync(new List<Tournament>
            {
                new Tournament
                {
                    Id = Guid.NewGuid(),
                    Name = "Олимпиада по програмиране с C++ - КСТ",
                    CreatorId = programmingCreator.Id,
                    GameId = programmingGame.Id
                },
                new Tournament
                {
                    Id = Guid.NewGuid(),
                    Name = "Олимпиада по програмиране с JAVA - КСТ",
                    CreatorId = programmingCreator.Id,
                    GameId = programmingGame.Id
                },
                new Tournament
                {
                    Id= Guid.NewGuid(),
                    Name = "Студентска олимпиада по тенис на маса 2025 - ТУ ВАРНА",
                    CreatorId = sportsCreator.Id,
                    GameId = dbContext.Games.First(g => g.Name == "Тенис на маса").Id

                },
                new Tournament
                {
                    Id= Guid.NewGuid(),
                    Name = "Студентска олимпиада по компютърна математика - ТУ ВАРНА",
                    CreatorId = programmingCreator.Id,
                    GameId = dbContext.Games.First(g => g.Name == "Математика").Id
                }
            });

            await dbContext.SaveChangesAsync();
        }
    }
}
