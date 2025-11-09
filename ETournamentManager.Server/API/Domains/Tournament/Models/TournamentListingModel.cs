namespace API.Domains.Tournament.Models
{
    using AutoMapper;
    using Core.Mapper;
    using Data.Models;
    using Game.Models;
    using Team.Models;
    using User.Models;

    public class TournamentListingModel : TournamentBaseModel, ICustomMapping
    {

        public GameListingModel Game { get; set; } = null!;

        public UserBaseModel Creator { get; set; } = null!;

        public ICollection<TeamBaseModel> Teams { get; set; } = new HashSet<TeamBaseModel>();

        public void ConfigureMapping(Profile mapper)
            => mapper.CreateMap<Tournament, TournamentListingModel>()
            .ForMember(t => t.Teams, opt => opt.MapFrom(t => t.Teams.Select(t => t.Team)))
            .ForMember(t => t.TournamentType, opt => opt.MapFrom(t => t.Type));
    }
}
