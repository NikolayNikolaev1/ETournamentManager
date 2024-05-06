﻿namespace Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Reflection;

    public class ETournamentManagerDbContext(DbContextOptions<ETournamentManagerDbContext> options) 
        : IdentityDbContext<User, Role, Guid>(options)
    {
        public DbSet<Game> Games { get; set; }

        public DbSet<Tournament> Tournaments { get; set; }

        public DbSet<TournamentPlayer> TournamentPlayers { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<TeamMember> TeamMembers { get; set; }

        public DbSet<TournamentTeam> TournamentTeams { get; set; }

        public DbSet<Round> Rounds { get; set; }

        public DbSet<RoundPlayer> RoundPlayers { get; set; }

        public DbSet<RoundTeam> RoundTeams { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
