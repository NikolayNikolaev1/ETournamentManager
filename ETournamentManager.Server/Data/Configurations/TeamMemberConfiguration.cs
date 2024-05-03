namespace Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    internal class TeamMemberConfiguration : IEntityTypeConfiguration<TeamMember>
    {
        public void Configure(EntityTypeBuilder<TeamMember> teamMember)
        {
            teamMember
                .HasKey(tm => new { tm.TeamId, tm.MemberId });

            teamMember
                .HasOne(t => t.Member)
                .WithMany(m => m.Teams)
                .HasForeignKey(t => t.MemberId)
                .OnDelete(DeleteBehavior.Restrict);

            teamMember
                .HasOne(m => m.Team)
                .WithMany(t => t.Members)
                .HasForeignKey(m => m.TeamId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
