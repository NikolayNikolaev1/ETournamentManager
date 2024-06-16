namespace API.Domains.Team
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [Route("api/[controller]")]
    [ApiController]
    public class TeamController(ITeamBusinessService teamService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await teamService.GetById(id));
        }

        [HttpPost]
        //[Authorize(Roles = "TeamCreater")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] TeamManagementModel model)
        {
            await teamService.Create(model);
            return Ok();
        }

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
        [Route("api/AddMember")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddMember([FromBody] TeamMemberModel model)
        {
            await teamService.AddMember(model);
            return Ok();
        }

        [HttpPatch]
        //[Authorize(Roles = "TeamMember", "TeamCreator", "Admin")]
        [Route("api/RemoveMember")]
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
