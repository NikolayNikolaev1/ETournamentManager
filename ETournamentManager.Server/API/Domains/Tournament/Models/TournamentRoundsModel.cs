namespace API.Domains.Tournament.Models
{
    using AutoMapper;
    using Core.Mapper;
    using Data.Models;
    using Round.Models;
    using Team.Models;

    public class TournamentRoundsModel : TournamentBaseModel, ICustomMapping
    {
        public string Game { get; set; } = null!;

        public ICollection<TeamBaseModel> Teams { get; set; } = new HashSet<TeamBaseModel>();

        public ICollection<RoundListingModel> Rounds { get; set; } = new List<RoundListingModel>();

        public new void ConfigureMapping(Profile mapper)
            => mapper
            .CreateMap<Tournament, TournamentRoundsModel>()
            .ForMember(t => t.Game, opt => opt.MapFrom(t => t.Game.Name))
            .ForMember(t => t.Teams, opt => opt.MapFrom(t => t.Teams.Select(t => t.Team)))
            .ForMember(t => t.Rounds, opt => opt.MapFrom(t => t.Rounds
                .OrderByDescending(r => r.Stage)
                .ThenBy(r => r.NextRoundId)));
    }
}
