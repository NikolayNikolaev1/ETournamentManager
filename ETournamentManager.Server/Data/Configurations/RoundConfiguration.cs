namespace Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    internal class RoundConfiguration : IEntityTypeConfiguration<Round>
    {
        public void Configure(EntityTypeBuilder<Round> round)
        {
            round
                .HasOne(r => r.NextRound)
                .WithOne()
                .HasForeignKey<Round>(r => r.NextRoundId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
