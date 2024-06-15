namespace API.Domains.Tournament.Models
{
    using AutoMapper;
    using Core.Mapper;
    using Data.Models;
    using Game.Models;
    using static Data.Models.Tournament;

    public class TournamentListingModel : IMapFrom<Tournament>
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public TournamentType TournamentType { get; set; }

        public int MinTeamMembers { get; set; }

        public GameListingModel Game { get; set; } = null!;
    }
}
