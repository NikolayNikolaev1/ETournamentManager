namespace Data.Models
{
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser<Guid>
    {
        public override Guid Id { get; set; } = Guid.NewGuid();

        public ICollection<UserRole> Roles { get; set; } = new HashSet<UserRole>();

        public ICollection<Tournament> CreatedTournaments { get; set; } = new HashSet<Tournament>();

        public ICollection<TeamMember> Teams { get; set; } = new HashSet<TeamMember>();
    }
}
