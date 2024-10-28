namespace API.Domains.User
{
    using Core.Extensions;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
    public class UserController(IUserBusinessService userService) : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(ICollection<UserListingModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll([FromQuery] UserQueryParamsModel queryParams)
            => await userService.GetAll(queryParams).ReturnOkResult();

        [HttpGet]
        [ProducesResponseType(typeof(UserProfileModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetProfile()
            => await userService.GetProfile().ReturnOkResult();


        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditUserName([FromBody] UserManagementModel user)
            => await userService.EditUsername(user.UserName).ReturnOkResult();
    }
}
