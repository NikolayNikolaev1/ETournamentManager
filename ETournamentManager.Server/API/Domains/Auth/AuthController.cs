namespace API.Domains.Auth
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;


    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost]
        [Route("Register")]
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
        [Route("Login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResponseModel))]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            return Ok(await authService.Login(model));
        }
    }
}
