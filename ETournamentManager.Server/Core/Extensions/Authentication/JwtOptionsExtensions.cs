namespace Core.Extensions.Authentication
{
    using Common.Data;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;
    using static Common.Constants.AuthConfig;

    public class JwtOptionsExtensions(IConfiguration configuration) : IConfigureOptions<JwtOptions>
    {

        void IConfigureOptions<JwtOptions>.Configure(JwtOptions options)
        {
            /* ASP.NET CORE API TEMPLATE USAGE DOCUMENTATION:
             * When using this template for a new project add JWT configuartions to appsettings.json.
             * JWT Json structure example:
             "{SectionName}": {
                  "Audiance": "*set audiance*",
                  "Issuer": "*set issuer*",
                  "SecretKey": "*set secret key*"
             }
           */
            configuration.GetSection(JWT_SECTION_NAME).Bind(options);
        }
    }
}
