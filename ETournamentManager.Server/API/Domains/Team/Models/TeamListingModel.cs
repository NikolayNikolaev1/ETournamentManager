namespace API.Domains.Team.Models
{
    using AutoMapper;
    using Core.Mapper;
    using Data.Models;
    using User.Models;

    public class TeamListingModel : TeamBaseModel, ICustomMapping
    {
        public string? Description { get; set; }

        public UserBaseModel Captain { get; set; } = null!;

        public ICollection<UserBaseModel> Members { get; set; } = new HashSet<UserBaseModel>();

        public int TournamentsWon { get; set; }

        public void ConfigureMapping(Profile mapper)
            => mapper
            .CreateMap<Team, TeamListingModel>()
            .ForMember(t => t.Captain, opt => opt.MapFrom(t => t.Members.First(m => m.IsCaptain).Member))
            .ForMember(t => t.Members, opt => opt.MapFrom(t => t.Members.Where(m => !m.IsCaptain).Select(m => m.Member)))
            .ForMember(t => t.TournamentsWon, opt => opt.MapFrom(t => t.Tournaments.Where(tr => tr.IsWinner).ToList().Count));
    }
}
