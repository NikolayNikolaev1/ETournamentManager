namespace App.Controllers
{
    using Core;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models.User;
    using Services;
    using Services.DTO.User;

    public class UserController : ControllerBase
    {
        private readonly IJwtService jwtService;
        private readonly IUserService userService;

        public UserController(
            IUserService userService,
            IJwtService jwtService)
        {
            this.userService = userService;
            this.jwtService = jwtService;
        }

        [Authorize]
        [HttpGet("~/api/Profile/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Profile(int id)
        {

            if (id <= 0) return BadRequest(id);

            if (!await this.userService.ContainsIdAsync(id)) return NotFound(id);

            //if (!this.userManager.IsAuhenticated) return StatusCode(StatusCodes.Status401Unauthorized);

            UserDTO user = await this.userService.FindIdAsync(id);

            return Ok(user);
        }

        [HttpPost("~/api/Login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserAuthDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Login([FromBody] UserLoginModel userFormModel)
        {
            if (userFormModel == null) return BadRequest(userFormModel); // TODO: Add prop validations.

            if (!await this.userService.ContainsEmailAsync(userFormModel.Email))
            {
                ModelState.AddModelError("CustomError", "User with given email and/or password was not found");
                return BadRequest(ModelState);
            }

            UserDTO user = await this.userService.FindEmailAsync(userFormModel.Email);
            UserHashDTO userHash = await this.userService.GetHashAsync(user.Id);

            if (!PasswordManager.VerifyPassword(userFormModel.Password, userHash.Password, userHash.Salt))
            {
                ModelState.AddModelError("CustomError", "User with given email and/or password was not found");
                return BadRequest(ModelState);
            }

            return Ok(new UserAuthDTO
            {
                Id = user.Id,
                Email = user.Email,
                Token = this.jwtService.Generate(user)
            });
        }

        [HttpPost("~/api/Register")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserAuthDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Register([FromBody] UserRegisterModel userFormModel)
        {
            if (userFormModel == null) return BadRequest(userFormModel); // TODO: Add prop validations.

            if (await this.userService.ContainsEmailAsync(userFormModel.Email))
            {
                ModelState.AddModelError(
                    "CustomError",
                    $"User with email {userFormModel.Email} already exist!");
                return BadRequest(ModelState);
            }

            UserDTO user = await this.userService.CreateAsync(userFormModel.Email, userFormModel.Password);

            return Ok(new UserAuthDTO
            {
                Id = user.Id,
                Email = user.Email,
                Token = this.jwtService.Generate(user)
            });
        }
    }
}
