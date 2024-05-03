namespace Data.Models
{
    public class TeamMember
    {
        public Guid TeamId { get; set; }

        public Team Team { get; set; } = null!;

        public Guid MemberId { get; set; }

        public User Member { get; set; } = null!;

        public bool IsCaptain { get; set; } = false;
    }
}
