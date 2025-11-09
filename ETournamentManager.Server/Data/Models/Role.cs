namespace Data.Models
{
    using Microsoft.AspNetCore.Identity;

    public class Role : IdentityRole<Guid>
    {
        public override Guid Id { get; set; } = Guid.NewGuid();

        public ICollection<UserRole> Users { get; set; } =new HashSet<UserRole>();
    }
}
