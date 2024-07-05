namespace API.Domains.User.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface IUserBusinessService : IService
    {
        Task<UserProfileModel> GetProfile();
    }
}
