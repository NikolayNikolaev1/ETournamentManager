namespace API.Domains.Auth.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface IAuthService : IService
    {
        CurrentUserModel GetCurrentUser();

        Task<UserProfileModel> GetProfile();

        Task<AuthResponseModel> Login(LoginModel model);

        Task<AuthResponseModel> Register(RegisterModel model);
    }
}
