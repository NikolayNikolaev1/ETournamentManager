namespace API.Domains.Tournament.Models
{
    using API.Domains.User.Models;
    using AutoMapper;
    using Core.Mapper;
    using Data.Models;
    using Game.Models;
    using Team.Models;

    using static Data.Models.Tournament;

    public class TournamentListingModel : IMapFrom<Tournament>, ICustomMapping
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public bool Active { get; set; }

        public int TournamentType { get; set; }

        public int MinTeamMembers { get; set; }

        public GameListingModel Game { get; set; } = null!;

        public UserBaseModel Creator { get; set; } = null!;

        public ICollection<TeamBaseModel> Teams { get; set; } = new HashSet<TeamBaseModel>();

        public void ConfigureMapping(Profile mapper)
            => mapper.CreateMap<Tournament, TournamentListingModel>()
            .ForMember(t => t.Teams, opt => opt.MapFrom(t => t.Teams.Select(t => t.Team)))
            .ForMember(t => t.TournamentType, opt => opt.MapFrom(t => t.Type));
    }
}
