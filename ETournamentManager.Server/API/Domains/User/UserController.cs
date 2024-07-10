namespace API.Domains.User
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class UserController(IUserBusinessService userService) : ControllerBase
    {
        [HttpGet]
        [Route("~/api/User/GetProfile")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserProfileModel))]
        public async Task<IActionResult> GetProfile()
        {
            return Ok(await userService.GetProfile());
        }
    }
}
