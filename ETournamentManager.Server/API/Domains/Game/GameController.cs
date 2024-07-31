namespace API.Domains.Game
{
    using Core.Extensions;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    using static Core.Common.Constants.Roles;

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GameController(IGameBusinessService gameService) : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GameListingModel))]
        public async Task<IActionResult> Get()
            => await gameService.GetAll().ReturnOkResult();

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GameListingModel))]
        public async Task<IActionResult> Get(string id)
            => await gameService.GetById(id).ReturnOkResult();

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] GameManagementModel gameModel)
            => await gameService.Create(gameModel).ReturnOkResult();

        [HttpPatch]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(string id, [FromBody] GameManagementModel model)
            => await gameService.Edit(id, model).ReturnOkResult();

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(string id)
            => await gameService.Delete(id).ReturnOkResult();
    }
}
