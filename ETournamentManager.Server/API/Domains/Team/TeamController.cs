namespace API.Domains.Team
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
    public class TeamController(ITeamBusinessService teamService) : ControllerBase
    {
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(TeamListingModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(string id)
            => await teamService.GetById(id).ReturnOkResult();

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = TOURNAMENT_PARTICIPANT)]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] TeamManagementModel model)
            => await teamService.Create(model).ReturnOkResult();

        [HttpPatch("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_PARTICIPANT}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(string id, [FromBody] TeamManagementModel model)
            => await teamService.Edit(id, model).ReturnOkResult();

        [HttpPatch]
        //[Authorize(Roles = "TeamMember")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddMember([FromBody] TeamMemberModel model)
        {
            await teamService.AddMember(model);
            return Ok();
        }

        [HttpPatch]
        //[Authorize(Roles = "TeamMember", "TeamCreator", "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> RemoveMember([FromBody] TeamMemberModel model)
        {
            await teamService.RemoveMember(model);
            return Ok();
        }


        [HttpDelete("{id}")]
        //[Authorize(Roles = "TeamCreater", "Admin"))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(string id)
        {
            await teamService.Delete(id);
            return Ok();
        }
    }
}
