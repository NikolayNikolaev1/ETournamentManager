namespace App.Extensions
{
    using Authentication;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;

    public class JwtBearerOptionsExtensions : IConfigureOptions<JwtBearerOptions>
    {
        private readonly JwtOptions jwtOptions;

        public JwtBearerOptionsExtensions(IOptions<JwtOptions> jwtOptions)
        {
            this.jwtOptions = jwtOptions.Value;
        }

        public void Configure(JwtBearerOptions options)
        {
            options.TokenValidationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = this.jwtOptions.Issuer,
                ValidAudience = this.jwtOptions.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(this.jwtOptions.SecretKey))
            };
        }
    }
}
