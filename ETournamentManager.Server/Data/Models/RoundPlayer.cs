namespace Data.Models
{
    public class RoundPlayer
    {
        public Guid RoundId { get; set; }

        public Round Round { get; set; } = null!;

        public Guid PlayerId { get; set; }

        public User Player { get; set; } = null!;

        public bool IsWinner { get; set; } = false;
    }
}
