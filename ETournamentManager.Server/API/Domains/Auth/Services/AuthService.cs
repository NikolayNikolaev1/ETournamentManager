namespace API.Domains.Auth.Services
{
    using AutoMapper;
    using Core.Common.Data;
    using Core.Exceptions;
    using Data.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using Models;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using static Core.Common.Constants.ErrorMessages;
    using static Core.Common.Constants.ErrorMessages.Auth;

    public class AuthService(
        UserManager<User> userManager,
        ClaimsPrincipal claimsPrincipal,
        IMapper mapper,
        IOptions<JwtOptions> options) : IAuthService
    {
        private CurrentUserModel currentUser = null!;

        public CurrentUserModel GetCurrentUser()
            => currentUser ??= mapper.Map<CurrentUserModel>(claimsPrincipal);

        public async Task<AuthResponseModel> Login(LoginModel model)
        {
            User? user = await userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                throw new BusinessServiceException(
                    INVALID_LOGIN_CREDENTIALS,
                    CLIENT_VALIDATION_ERROR_TITLE,
                    "Email",
                    StatusCodes.Status404NotFound);
            }

            if (!await userManager.CheckPasswordAsync(user, model.Password))
            {
                throw new BusinessServiceException(
                    INVALID_LOGIN_CREDENTIALS,
                    StatusCodes.Status404NotFound);
            }

            return new AuthResponseModel
            {
                Token = await GenerateJwtToken(user),
            };
        }

        public async Task<AuthResponseModel> Register(RegisterModel model)
        {
            if (await userManager.FindByEmailAsync(model.Email) != null)
            {
                //TODO: add error
                return new AuthResponseModel
                {
                    Errors = ["User already exists"]
                };
            }

            User user = new User
            {
                Email = model.Email,
                UserName = model.UserName,
            };

            var userCreated = await userManager.CreateAsync(user, model.Password);


            if (!userCreated.Succeeded)
            {
                return new AuthResponseModel
                {
                    Errors = userCreated.Errors.Select(e => e.Description).ToList()
                };
            }

            await userManager.AddToRoleAsync(user, model.RoleName);

            return new AuthResponseModel
            {
                Token = await GenerateJwtToken(user),
            };
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            ICollection<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Name, user.UserName!),
                //new Claim(ClaimTypes.Name, user.UserName!),
                //new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                //new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            };


            ICollection<string> userRoles = await userManager.GetRolesAsync(user);

            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(options.Value.SecretKey)),
                SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                options.Value.Issuer,
                options.Value.Audience,
                claims,
                null,
                DateTime.UtcNow.AddHours(12),
                signingCredentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
