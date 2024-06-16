namespace API.Domains.Team.Models
{
    public class TeamListingModel
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string Tag { get; set; } = null!;

        public string? Description { get; set; }
    }
}
