namespace Core.Testing
{
    using AutoMapper;
    using Data;
    using Mapper;
    using Microsoft.EntityFrameworkCore;

    public class Testing
    {
        public static ETournamentManagerDbContext CreateDatabaseContext()
            => new ETournamentManagerDbContext(
                new DbContextOptionsBuilder<ETournamentManagerDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options);

        public static IMapper CreateMapper()
            => new MapperConfiguration(
                cfg => cfg.AddProfile<AutoMapperProfile>())
                .CreateMapper();
    }
}
