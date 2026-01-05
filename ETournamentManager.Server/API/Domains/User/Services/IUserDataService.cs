namespace API.Domains.User.Services
{
    using Core.Common.Data.Interfaces;
    using Data.Models;

    public interface IUserDataService : IService
    {
        Task<User?> GetById(string id);

        Task<ICollection<User>> GetAllByRoleName(string roleName);
    }
}
