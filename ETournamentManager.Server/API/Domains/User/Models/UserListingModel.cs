namespace API.Domains.User.Models
{
    using AutoMapper;
    using Core.Mapper;
    using Data.Models;

    public class UserListingModel : UserBaseModel, ICustomMapping
    {
        public string Email { get; set; } = null!;

        public string RoleName { get; set; } = null!;

        public ICollection<string> TeamIds { get; set; } = new HashSet<string>();

        public void ConfigureMapping(Profile mapper)
            => mapper
            .CreateMap<User, UserListingModel>()
            .ForMember(u => u.RoleName, opt => opt.MapFrom(u => u.Roles.First().Role.Name))
            .ForMember(u => u.TeamIds, opt => opt.MapFrom(u => u.Teams.Select(t => t.TeamId.ToString())));
    }
}
