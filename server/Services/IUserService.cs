namespace Services
{
    using DTO.User;

    public interface IUserService
    {
        Task<bool> ContainsEmailAsync(string email);

        Task<bool> ContainsIdAsync(int id);

        Task<UserDTO> CreateAsync(string email, string password);

        Task<UserDTO> FindEmailAsync(string email);

        Task<UserDTO> FindIdAsync(int id);

        Task<UserHashDTO> GetHashAsync(int id);
    }
}