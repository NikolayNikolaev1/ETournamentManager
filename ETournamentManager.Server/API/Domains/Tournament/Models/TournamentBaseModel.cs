namespace API.Domains.Tournament.Models
{
    using Core.Mapper;
    using Data.Models;

    public class TournamentBaseModel : IMapFrom<Tournament>
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public bool Active { get; set; }

        public bool Finished { get; set; }

        public int TournamentType { get; set; }

        public int MinTeamMembers { get; set; }
    }
}
