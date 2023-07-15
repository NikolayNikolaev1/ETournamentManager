namespace Services
{
    using DTO.User;

    public interface IUserService
    {
        Task<bool> ContainsEmailAsync(string email);

        Task<UserDTO> CreateAsync(string email, string password);
    }
}