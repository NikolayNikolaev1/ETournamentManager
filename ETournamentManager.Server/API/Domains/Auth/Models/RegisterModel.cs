namespace API.Domains.Auth.Models
{
    using System.ComponentModel.DataAnnotations;
    using static Core.Common.Constants.Roles;

    public class RegisterModel
    {
        [Required]
        public string UserName { get; set; } = null!;

        [Required]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        [Required]
        [AllowedValues(TOURNAMENT_CREATOR, TOURNAMENT_PARTICIPANT, ErrorMessage = "Invalid role")]
        public string RoleName { get; set; } = null!;
    }
}
