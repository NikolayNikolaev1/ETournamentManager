namespace Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Data.Models;

    internal class TournamentPlayerConfiguration : IEntityTypeConfiguration<TournamentPlayer>
    {
        public void Configure(EntityTypeBuilder<TournamentPlayer> tournamentPlayer)
        {
            tournamentPlayer
                .HasKey(tp => new { tp.TournamentId, tp.PlayerId });

            tournamentPlayer
                .HasOne(t => t.Player)
                .WithMany(p => p.Tournaments)
                .HasForeignKey(t => t.PlayerId)
                .OnDelete(DeleteBehavior.Restrict);

            tournamentPlayer
                .HasOne(p => p.Tournament)
                .WithMany(t => t.Players)
                .HasForeignKey(p => p.TournamentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
