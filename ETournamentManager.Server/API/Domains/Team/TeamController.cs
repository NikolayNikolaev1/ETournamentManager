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
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TeamListingModel))]
        public async Task<IActionResult> Get(string id)
            => await teamService.GetById(id).ReturnOkResult();

        [HttpPost]
        //[Authorize(Roles = TOURNAMENT_PARTICIPANT)]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = TOURNAMENT_PARTICIPANT)]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] TeamManagementModel model)
            => await teamService.Create(model).ReturnOkResult();

        [HttpPatch]
        //[Authorize(Roles = "TeamCreater", "Admin"))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(string id, [FromBody] TeamManagementModel model)
        {
            await teamService.Edit(id, model);
            return Ok();
        }

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


        [HttpDelete]
        //[Authorize(Roles = "TeamCreater", "Admin"))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(string id)
        {
            await teamService.Delete(id);
            return Ok();
        }
    }
}
