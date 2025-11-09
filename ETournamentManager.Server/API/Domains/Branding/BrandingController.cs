namespace API.Domains.Branding
{
    using Core.Extensions;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;
    using static Core.Common.Constants.Roles;

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BrandingController(IBrandingService brandingService) : ControllerBase
    {
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(BrandingListingModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
            => await brandingService.Get().ReturnOkResult();

        [HttpPatch]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateInfo([FromBody] InfoManagementModel model)
            => await brandingService.EditInfo(model).ReturnOkResult();

        [HttpPatch]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateAccess([FromBody] AccessManagementModel model)
            => await brandingService.EditAccess(model).ReturnOkResult();

        [HttpPatch]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateTheme([FromBody] ThemeManagementModel model)
            => await brandingService.EditTheme(model).ReturnOkResult();
    }
}
