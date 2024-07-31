namespace API.Domains.Team.Models
{
    using AutoMapper;
    using Core.Mapper;
    using Data.Models;

    public class TeamListingModel : IMapFrom<Team>, ICustomMapping
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string Tag { get; set; } = null!;

        public string? Description { get; set; }

        public int PlayrsCount { get; set; }

        public int TournamentsWon { get; set; }

        public void ConfigureMapping(Profile mapper)
            => mapper
            .CreateMap<Team, TeamListingModel>()
            .ForMember(t => t.PlayrsCount, opt => opt.MapFrom(t => t.Members.Count))
            .ForMember(t => t.TournamentsWon, opt => opt.MapFrom(t => t.Tournaments.Where(tr => tr.IsWinner).ToList().Count));
    }
}
