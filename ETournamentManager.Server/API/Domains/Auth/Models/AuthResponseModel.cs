namespace API.Domains.Auth.Models
{
    public class AuthResponseModel
    {
        public string Token { get; set; } = null!;

        public ICollection<string> Errors { get; set; } = new List<string>();
    }
}
