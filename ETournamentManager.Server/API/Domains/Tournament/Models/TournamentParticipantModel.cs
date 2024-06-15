namespace API.Domains.Tournament.Models
{
    using static Data.Models.Tournament;

    public class TournamentParticipantModel
    {
        public string TournamentId { get; set; } = null!;

        public string ParticipantId { get; set; } = null!;

        public TournamentType ParticipantType { get; set; }
    }
}
