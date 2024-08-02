namespace API.Domains.Tournament.Models
{
    using static Data.Models.Tournament;

    public class TournamentManagementModel
    {
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public TournamentType Type { get; set; }

        public int MinTeamMembers { get; set; }

        public string GameId { get; set; } = null!;
    }
}
