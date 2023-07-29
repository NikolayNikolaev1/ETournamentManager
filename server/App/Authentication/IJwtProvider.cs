namespace App.Authentication
{
    using Services.DTO.User;

    public interface IJwtProvider
    {
        string Generate(UserDTO user);
    }
}
