namespace App.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Services;
    using Services.DTO.User;

    public class UserController : ControllerBase
    {
        private IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("~/api/Register")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserCreateDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Register([FromBody] UserCreateDTO userDTO)
        {
            if (userDTO == null)
            {
                return BadRequest(userDTO);
            }


            if (await this.userService.ContainsEmailAsync(userDTO.Email))
            {
                ModelState.AddModelError("CustomError", $"User with email {userDTO.Email} already exist!");
                return BadRequest(ModelState);
            }

            UserDTO user = await this.userService.CreateAsync(userDTO.Email, userDTO.Password);

            return Ok(user);
        }
    }
}
