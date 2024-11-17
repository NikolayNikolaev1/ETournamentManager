namespace API.Domains.User.Models
{
    using Core.Mapper;
    using Data.Models;

    public class UserBaseModel : IMapFrom<User>
    {
        public string Id { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public bool Disabled { get; set; }
    }
}
