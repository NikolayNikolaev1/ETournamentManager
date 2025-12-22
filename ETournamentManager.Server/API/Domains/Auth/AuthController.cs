namespace API.Domains.Auth
{
    using Core.Extensions;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResponseModel))]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
            => await authService.Register(model).ReturnOkResult();

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResponseModel))]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
            => await authService.Login(model).ReturnOkResult();

        [HttpPatch]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> PasswordChange([FromBody] PasswordChangeModel model)
            => await authService.PasswordChange(model).ReturnOkResult();

        [HttpGet()]
        [AllowAnonymous]
        public IActionResult GoogleLogin(string returnUrl)
        {
            var callbackUrl = Url.Action(nameof(GoogleCallback), "Auth", values: null, protocol: Request.Scheme);
            var redirectUrl = $"{callbackUrl}?returnUrl={Uri.EscapeDataString(returnUrl)}";
            return Challenge(authService.test(redirectUrl), "Google");
        }

        [HttpGet()]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleCallback(string returnUrl)
        { 
            
            var response = await authService.LoginWithGoogle();

            return Redirect($"http://localhost:4200/auth-callback?token={response.Token}");
        }

    }
}
