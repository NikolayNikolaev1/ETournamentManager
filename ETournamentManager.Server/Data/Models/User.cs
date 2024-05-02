namespace Data.Models
{
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser<Guid>
    {
        public override Guid Id { get; set; } = Guid.NewGuid();
    }
}
