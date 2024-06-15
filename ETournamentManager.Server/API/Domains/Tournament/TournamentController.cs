namespace API.Domains.Tournament
{
    using API.Domains.Tournament.Models;
    using API.Domains.Tournament.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController(ITournamentService tournamentService) : ControllerBase
    {
        [HttpPost]
        //[Authorize(Roles = "TeamCreater")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] TournamentCreateModel model)
        {
            await tournamentService.Create(model);
            return Ok();
        }

        [HttpGet]
        [Route("Game/Get")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await tournamentService.GetById(id));
        }
    }
}
