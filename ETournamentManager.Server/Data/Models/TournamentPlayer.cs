namespace Data.Models
{
    public class TournamentPlayer
    {
        public Guid TournamentId { get; set; }

        public Tournament Tournament { get; set; } = null!;

        public Guid PlayerId { get; set; }

        public User Player { get; set; } = null!;

        public bool IsWinner { get; set; } = false;
    }
}
