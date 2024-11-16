namespace API.Domains.User
{
    using Core.Extensions;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController(IUserBusinessService userService) : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(ICollection<UserListingModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll([FromQuery] UserQueryParamsModel queryParams)
            => await userService.GetAll(queryParams).ReturnOkResult();

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(UserProfileModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetProfile()
            => await userService.GetProfile().ReturnOkResult();


        [HttpPatch]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditUserName([FromBody] UserManagementModel user)
            => await userService.EditUsername(user.UserName).ReturnOkResult();
    }
}
