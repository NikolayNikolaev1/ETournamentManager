namespace API.Domains.Auth
{
    using Core.Extensions;
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
    }
}
