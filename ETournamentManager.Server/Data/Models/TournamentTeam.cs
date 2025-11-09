namespace Data.Models
{
    public class TournamentTeam
    {
        public Guid TournamentId { get; set; }

        public Tournament Tournament { get; set; } = null!;

        public Guid TeamId { get; set; }

        public Team Team { get; set; } = null!;

        public bool IsWinner { get; set; } = false;
    }
}
