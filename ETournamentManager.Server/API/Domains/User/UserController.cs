namespace API.Domains.User
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserBusinessService userService) : ControllerBase
    {
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "ADMIN")]
        [Route("~/api/User/GetProfile")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserProfileModel))]
        public async Task<IActionResult> GetProfile()
        {
            return Ok(await userService.GetProfile());
        }
    }
}
