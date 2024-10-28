namespace API.Domains.User.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface IUserBusinessService : IService
    {
        Task<ICollection<UserListingModel>> GetAll(UserQueryParamsModel queryParams);

        Task<UserProfileModel> GetProfile();

        Task EditUsername(string userName);
    }
}
