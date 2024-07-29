namespace API.Domains.Auth
{
    using Core.Extensions;
    using Data.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;


    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController(
        IAuthService authService,
        SignInManager<User> signInManager) : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResponseModel))]
        public async Task<IActionResult> Regsiter([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Request Payload");
            }

            return Ok(await authService.Register(model));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResponseModel))]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
            => await authService.Login(model).ReturnOkResult();
    }
}
