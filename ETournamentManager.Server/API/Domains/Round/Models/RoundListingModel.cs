namespace API.Domains.Round.Models
{
    using AutoMapper;
    using Core.Mapper;
    using Data.Models;
    using Team.Models;

    using static Data.Models.Round;

    public class RoundListingModel : IMapFrom<Round>, ICustomMapping
    {
        public string Id { get; set; } = null!;

        public RoundStage Type { get; set; }

        public string TournamentId { get; set; } = null!;

        public string? WinnerId { get; set; }

        public RoundListingModel? NextRound { get; set; }

        public ICollection<TeamBaseModel> Teams { get; set; } = new List<TeamBaseModel>();

        public void ConfigureMapping(Profile mapper)
            => mapper.CreateMap<Round, RoundListingModel>()
            .ForMember(r => r.WinnerId,
                opt => opt.MapFrom(r => r.Teams.First(t => t.IsWinner).TeamId))
            .ForMember(r => r.Teams,
                opt => opt.MapFrom(r => r.Teams.Select(t => t.Team)));
    }
}
