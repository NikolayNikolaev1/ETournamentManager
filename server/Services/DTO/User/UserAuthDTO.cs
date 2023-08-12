namespace Services.DTO.User
{
    public class UserAuthDTO
    {
        public int Id { get; set; }

        public string Email { get; set; } = null!;

        public string Token { get; set; } = null!;
    }
}
