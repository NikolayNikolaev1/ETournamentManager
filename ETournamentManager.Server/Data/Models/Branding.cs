namespace Data.Models
{
    public class Branding
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string PlatformName { get; set; }

        public string PrimaryColor { get; set; }

        public string SecondaryColor { get; set; }

        public string TextColor { get; set; }

        public string BackgroundColor { get; set; }

        public bool AccessTeamTable { get; set; }

        public bool AccessTournamentTable { get; set; }

        public bool AccessTeamDetails { get; set; }

        public bool AccessTournamentDetails { get; set; }

        public string ContactLink { get; set; }

        public string ContactEmail { get; set; }
    }
}
