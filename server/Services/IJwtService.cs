namespace Services
{
    using DTO.User;

    public interface IJwtService
    {
        string Generate(UserDTO user);
    }
}
