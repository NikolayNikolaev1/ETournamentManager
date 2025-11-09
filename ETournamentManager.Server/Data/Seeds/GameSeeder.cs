namespace Data.Seeds
{
    using Models;
    using Microsoft.Extensions.DependencyInjection;

    public class GameSeeder
    {
        public static async Task Seed(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<ETournamentManagerDbContext>();

            await dbContext.Games.AddRangeAsync(new List<Game>
            {
                new Game
                {
                    Id = Guid.NewGuid(),
                    Name = "Програмиране"
                },
                new Game
                {
                    Id= Guid.NewGuid(),
                    Name = "Тенис на маса"
                },
                new Game
                {
                    Id= Guid.NewGuid(),
                    Name = "Математика"
                }
            });

            await dbContext.SaveChangesAsync();
        }
    }
}
