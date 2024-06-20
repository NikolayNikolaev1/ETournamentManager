namespace API.Domains.Tournament
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController(ITournamentBusinessService tournamentService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await tournamentService.GetById(id));
        }

        [HttpPost]
        //[Authorize(Roles = "TeamCreater")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] TournamentCreateModel model)
        {
            await tournamentService.Create(model);
            return Ok();
        }

        [HttpPatch]
        //[Authorize(Roles = "TeamCreater", "Admin"))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] TournamentCreateModel model)
        {
            await tournamentService.Edit(model);
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
