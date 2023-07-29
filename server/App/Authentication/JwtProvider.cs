namespace App.Authentication
{
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using Services.DTO.User;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    public sealed class JwtProvider : IJwtProvider 
    {
        private readonly JwtOptions options;

        public JwtProvider(IOptions<JwtOptions> options)
        {
            this.options = options.Value;
        }

        public string Generate(UserDTO user)
        {
            var claims = new Claim[] 
            { 
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("secretkey_secretkey123!")),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                "issuer",
                "audience",
                claims,
                null,
                DateTime.UtcNow.AddHours(1),
                signingCredentials);

            string tokenValue = new JwtSecurityTokenHandler()
                .WriteToken(token);

            return tokenValue;
        }
    }
}
