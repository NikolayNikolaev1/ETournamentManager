namespace API.Domains.Game
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [Route("api/[controller]")]
    [ApiController]
    public class GameController(IGameBusinessService gameService) : ControllerBase
    {
        [HttpPost]
        //[Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] GameManagementModel gameModel)
        {
            await gameService.Create(gameModel);
            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GameListingModel))]
        public async Task<IActionResult> Get()
        {
            return Ok(await gameService.GetAll());
        }
    }
}
