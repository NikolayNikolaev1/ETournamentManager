namespace API.Domains.Game
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    public class GameController(IGameService gameService) : ControllerBase
    {
        [HttpPost]
        [Route("Game/Create")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GameListingViewModel))]
        public async Task<IActionResult> Create([FromBody] GameCreationViewModel gameModel)
        {
            var game = await gameService.Create(gameModel);
            return Ok(game);
        }

        [HttpGet]
        [Route("Game/Get")]
        public async Task<IActionResult> Get()
        {
            return Ok(await gameService.GetAll());
        }
    }
}
