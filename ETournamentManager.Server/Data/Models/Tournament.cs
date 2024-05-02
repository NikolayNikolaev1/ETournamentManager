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

        public TournamentType Type { get; set; }

        public int? MinTeamMembers { get; set; }

        [Required]
        public bool Active { get; set; } = false;

        public Game Game { get; set; } = null!;

        public int GameId { get; set; }

        public User? Winner { get; set; }

        public int? WinnerId { get; set; }
    }
}
