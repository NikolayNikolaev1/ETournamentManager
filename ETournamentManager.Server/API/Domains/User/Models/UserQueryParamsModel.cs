namespace API.Domains.User.Models
{
    public class UserQueryParamsModel
    {
        public string? Search { get; set; }

        public string? Role { get; set; }

        public string? TeamIds { get; set; }
    }
}
