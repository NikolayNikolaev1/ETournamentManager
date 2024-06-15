namespace API.Domains.Game
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [Route("api/[controller]")]
    public class GameController(IGameService gameService) : ControllerBase
    {
        [HttpPost]
        //[Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GameListingModel))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] GameCreationViewModel gameModel)
        {
            var game = await gameService.Create(gameModel);
            return Ok(game);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await gameService.GetAll());
        }
    }
}
