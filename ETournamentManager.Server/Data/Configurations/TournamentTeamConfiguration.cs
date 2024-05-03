namespace Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    internal class TournamentTeamConfiguration : IEntityTypeConfiguration<TournamentTeam>
    {
        public void Configure(EntityTypeBuilder<TournamentTeam> tournamentTeam)
        {
            tournamentTeam
                .HasKey(tt => new { tt.TournamentId, tt.TeamId });

            tournamentTeam
                .HasOne(t => t.Team)
                .WithMany(t => t.Tournaments)
                .HasForeignKey(t => t.TeamId)
                .OnDelete(DeleteBehavior.Restrict);

            tournamentTeam
                .HasOne(t => t.Tournament)
                .WithMany(t => t.Teams)
                .HasForeignKey(t => t.TournamentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
