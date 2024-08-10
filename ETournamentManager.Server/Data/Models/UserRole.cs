namespace Data.Models
{
    using Microsoft.AspNetCore.Identity;

    public class UserRole : IdentityUserRole<Guid>
    {
        public override Guid UserId { get; set; }

        public User User { get; set; } = null!;

        public override Guid RoleId { get; set; }

        public Role Role { get; set; } = null!;
    }
}
