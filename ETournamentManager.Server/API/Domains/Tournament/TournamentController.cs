namespace API.Domains.Tournament
{
    using API.Domains.Team.Models;
    using Core.Extensions;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    using static Core.Common.Constants.Roles;
    using static Microsoft.AspNetCore.Http.StatusCodes;

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TournamentController(ITournamentBusinessService tournamentService) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await tournamentService.GetById(id));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] TournamentQueryParams queryParams)
            => await tournamentService.GetAll(queryParams).ReturnOkResult();

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllWithRounds()
            => await tournamentService.GetAllWithRounds().ReturnOkResult();

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_CREATOR}")]
        [ProducesResponseType(typeof(string), Status200OK)]
        [ProducesResponseType(Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] TournamentManagementModel model)
            => await tournamentService.Create(model).ReturnOkResult();

        [HttpPatch("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_CREATOR}")]
        [ProducesResponseType(Status200OK)]
        public async Task<IActionResult> Update(string id, [FromBody] TournamentManagementModel model)
        {
            await tournamentService.Edit(id, model);
            return Ok();
        }

        [HttpPatch]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_CREATOR}")]
        [ProducesResponseType(typeof(TeamBaseModel), Status200OK)]
        public async Task<IActionResult> AddParticipant([FromBody] TournamentTeamModel model)
            => await tournamentService.Join(model).ReturnOkResult();

        [HttpPatch]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_CREATOR}, {TOURNAMENT_PARTICIPANT}")]
        [ProducesResponseType(Status200OK)]
        public async Task<IActionResult> RemoveParticipant([FromBody] TournamentTeamModel model)
        {
            await tournamentService.Leave(model);
            return Ok();
        }

        [HttpPatch("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_CREATOR}")]
        public async Task<IActionResult> Finish(string id)
            => await tournamentService.Finish(id).ReturnOkResult();


        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = $"{ADMIN}, {TOURNAMENT_CREATOR}")]
        [ProducesResponseType(Status200OK)]
        public async Task<IActionResult> Delete(string id)
        {
            await tournamentService.Delete(id);
            return Ok();
        }
    }
}
