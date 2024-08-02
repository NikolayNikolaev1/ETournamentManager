namespace API.Domains.Tournament
{
    using Core.Extensions;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    using static Core.Common.Constants.Roles;

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TournamentController(ITournamentBusinessService tournamentService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await tournamentService.GetById(id));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = TOURNAMENT_CREATOR)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] TournamentManagementModel model)
            => await tournamentService.Create(model).ReturnOkResult();

        [HttpPatch]
        //[Authorize(Roles = "TeamCreater", "Admin"))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(string id, [FromBody] TournamentManagementModel model)
        {
            await tournamentService.Edit(id, model);
            return Ok();
        }

        [HttpPatch]
        //[Authorize(Roles = "TeamMember")]
        [Route("api/AddParticipant")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddParticipant([FromBody] TournamentTeamModel model)
        {
            await tournamentService.Join(model);
            return Ok();
        }

        [HttpPatch]
        //[Authorize(Roles = "TeamMember", "TeamCreator", "Admin")]
        [Route("api/RemoveParticipant")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> RemoveParticipant([FromBody] TournamentTeamModel model)
        {
            await tournamentService.Leave(model);
            return Ok();
        }


        [HttpDelete]
        //[Authorize(Roles = "TeamCreater", "Admin"))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(string id)
        {
            await tournamentService.Delete(id);
            return Ok();
        }
    }
}
