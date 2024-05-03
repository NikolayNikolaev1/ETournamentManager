namespace Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    internal class TournamentConfiguration : IEntityTypeConfiguration<Tournament>
    {
        public void Configure(EntityTypeBuilder<Tournament> tournament)
        {
            tournament
                .HasOne(t => t.Game)
                .WithMany(g => g.Tournaments)
                .HasForeignKey(t => t.GameId)
                .OnDelete(DeleteBehavior.Restrict);

            tournament
                .HasOne(t => t.Creator)
                .WithMany(c => c.CreatedTournaments)
                .HasForeignKey(t => t.CreatorId)
                .OnDelete(DeleteBehavior.Restrict);

            tournament
                .HasMany(t => t.Rounds)
                .WithOne(r => r.Tournament)
                .HasForeignKey(r => r.TournamentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
