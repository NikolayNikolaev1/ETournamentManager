namespace API.Domains.Team.Models
{
    public class TeamQueryParamsModel
    {
        public string? Search { get; set; }

        public string? UserIds { get; set; }

        public string? TournamentIds { get; set;}

        public bool? IsPrivate { get; set; }

        public string? WithoutMemberIds { get; set; }
    }
}   
