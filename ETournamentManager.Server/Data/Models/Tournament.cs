namespace Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Tournament
    {
        public enum TournamentType
        {
            SinglePlayer = 0,
            Team = 1
        }
        
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public TournamentType Type { get; set; }

        public int? MinTeamMembers { get; set; }

        [Required]
        public bool Active { get; set; } = false;

        public bool Finished { get; set; } = false;

        public Guid GameId { get; set; }

        public Game Game { get; set; } = null!;

        public Guid CreatorId { get; set; }

        public User Creator { get; set; } = null!;

        public ICollection<Round> Rounds { get; set; } = new List<Round>();

        public ICollection<TournamentTeam> Teams { get; set; } = new List<TournamentTeam>();
    }
}
