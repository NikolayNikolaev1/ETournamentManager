namespace API.Domains.Auth.Models
{
    using AutoMapper;
    using Core.Mapper;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;

    using static Core.Common.Constants.Roles;

    public class CurrentUserModel : IMapFrom<ClaimsPrincipal>, ICustomMapping
    {
        public string Id { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;

        public string RoleName { get; set; } = string.Empty;

        public void ConfigureMapping(Profile mapper)
            => mapper
            .CreateMap<ClaimsPrincipal, CurrentUserModel>()
            .ForMember(u => u.Id, opt => opt.MapFrom(cp => cp.FindFirstValue(ClaimTypes.NameIdentifier)))
            .ForMember(u => u.Username, opt => opt.MapFrom(cp => cp.FindFirstValue(JwtRegisteredClaimNames.Name)))
            .ForMember(u => u.Email, opt => opt.MapFrom(cp => cp.FindFirstValue(ClaimTypes.Email)))
            .ForMember(u => u.RoleName, opt => opt.MapFrom(
                cp => cp.IsInRole(TOURNAMENT_CREATOR)
                    ? TOURNAMENT_CREATOR
                    : cp.IsInRole(TOURNAMENT_PARTICIPANT)
                    ? TOURNAMENT_PARTICIPANT
                    : ADMIN));
    }
}
