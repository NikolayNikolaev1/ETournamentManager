namespace Services.DTO.User
{
    public class UserHashDTO
    {
        public string Password { get; set; } = null!;

        public byte[] Salt { get; set; } = null!;
    }
}
