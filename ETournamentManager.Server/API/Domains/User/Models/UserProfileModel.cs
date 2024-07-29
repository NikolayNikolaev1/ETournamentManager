namespace API.Domains.User.Models
{
    using Core.Mapper;
    using Data.Models;

    public class UserProfileModel : IMapFrom<User>
    {
        public string Id { get; set; } = null!;

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string RoleName { get; set; } = null!;
    }
}
