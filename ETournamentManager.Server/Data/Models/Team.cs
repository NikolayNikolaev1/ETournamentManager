namespace Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Team
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Tag { get; set; } = null!;

        public string? Description { get; set; }

        public bool IsPrivate { get; set; }

        public ICollection<TeamMember> Members { get; set; } = new List<TeamMember>();

        public ICollection<TournamentTeam> Tournaments { get; set; } = new List<TournamentTeam>();

        public ICollection<RoundTeam> Rounds { get; set; } = new List<RoundTeam>();
    }
}
