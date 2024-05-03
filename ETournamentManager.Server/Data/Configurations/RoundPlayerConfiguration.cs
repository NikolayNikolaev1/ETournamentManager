namespace Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    internal class RoundPlayerConfiguration : IEntityTypeConfiguration<RoundPlayer>
    {
        public void Configure(EntityTypeBuilder<RoundPlayer> roundPlayer)
        {
            roundPlayer
                .HasKey(rp => new { rp.RoundId, rp.PlayerId });

            roundPlayer
                .HasOne(r => r.Player)
                .WithMany(p => p.Rounds)
                .HasForeignKey(r => r.PlayerId)
                .OnDelete(DeleteBehavior.Restrict);

            roundPlayer
                .HasOne(p => p.Round)
                .WithMany(r => r.Players)
                .HasForeignKey(p => p.RoundId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
