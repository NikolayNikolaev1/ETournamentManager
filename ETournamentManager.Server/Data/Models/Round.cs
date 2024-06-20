namespace Data.Models
{
    public class Round
    {
        public enum RoundStage
        {
            Finals = 0,
            Semifinals = 1,
            Quarterfinals = 2,
        }

        public Guid Id { get; set; } = Guid.NewGuid();

        public RoundStage Stage { get; set; }

        public Guid TournamentId { get; set; }

        public Tournament Tournament { get; set; } = null!;

        public Guid? NextRoundId { get; set; }

        public Round? NextRound { get; set; }

        public ICollection<RoundTeam> Teams { get; set; } = new List<RoundTeam>();
    }
}
