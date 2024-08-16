namespace API.Domains.Round
{
    using Core.Extensions;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    using static Core.Common.Constants.Roles;
    using static Microsoft.AspNetCore.Http.StatusCodes;

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RoundController(IRoundBusinessService roundService) : ControllerBase
    {
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_CREATOR}")]
        [ProducesResponseType(typeof(ICollection<RoundListingModel>), Status200OK)]
        public async Task<IActionResult> GetAll(string id)
            => await roundService.GetAll(id).ReturnOkResult();

        [HttpPost("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_CREATOR}")]
        [ProducesResponseType(typeof(ICollection<RoundListingModel>), Status200OK)]
        public async Task<IActionResult> Generate(string id)
            => await roundService.Generate(id).ReturnOkResult();

        [HttpPatch()]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_CREATOR}")]
        [ProducesResponseType(typeof(ICollection<RoundListingModel>), Status200OK)]
        public async Task<IActionResult> End([FromBody] RoundWinnerModel model)
            => await roundService.End(model).ReturnOkResult();
    }
}
