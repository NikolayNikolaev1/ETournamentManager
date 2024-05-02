namespace Data
{
    using Data.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    public class ETournamentManagerDbContext(DbContextOptions<ETournamentManagerDbContext> options) 
        : IdentityDbContext<User, Role, Guid>(options)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(b =>
            {
                b.Property(u => u.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<Role>(b =>
            {
                b.Property(u => u.Id).HasDefaultValueSql("newsequentialid()");
            });
        }
    }
}
