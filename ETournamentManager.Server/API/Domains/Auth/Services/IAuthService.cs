namespace API.Domains.Auth.Services
{
    using Core.Common.Data.Interfaces;
    using Microsoft.AspNetCore.Authentication;
    using Models;

    public interface IAuthService : IService
    {
        CurrentUserModel GetCurrentUser();

        Task<AuthResponseModel> Login(LoginModel model);

        Task<AuthResponseModel> Register(RegisterModel model);

        Task PasswordChange(PasswordChangeModel model);

        Task<AuthResponseModel> LoginWithGoogle();

        AuthenticationProperties test(string returnUrl);
    }
}
