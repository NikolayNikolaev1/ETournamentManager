namespace Data.Models
{
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser<Guid>
    {
        public override Guid Id { get; set; } = Guid.NewGuid();

        public ICollection<Tournament> CreatedTournaments { get; set; } = new List<Tournament>();

        public ICollection<TeamMember> Teams { get; set; } = new List<TeamMember>();
    }
}
