namespace Data.Configurations
{
    using Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    internal class RoundTeamConfiguration : IEntityTypeConfiguration<RoundTeam>
    {
        public void Configure(EntityTypeBuilder<RoundTeam> roundTeam)
        {
            roundTeam
                .HasKey(rt => new { rt.RoundId, rt.TeamId });

            roundTeam
                .HasOne(r => r.Team)
                .WithMany(t => t.Rounds)
                .HasForeignKey(r => r.TeamId)
                .OnDelete(DeleteBehavior.Restrict);

            roundTeam
                .HasOne(t => t.Round)
                .WithMany(r => r.Teams)
                .HasForeignKey(t => t.RoundId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
