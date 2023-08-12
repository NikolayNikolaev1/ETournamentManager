namespace App.Extensions.Authentication
{
    using Microsoft.Extensions.Options;
    using Services.DTO.User;

    public class JwtOptionsExtensions : IConfigureOptions<JwtOptions>
    {
        private const string SectionName = "JwtCredentials";
        private readonly IConfiguration configuration;

        public JwtOptionsExtensions(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

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
            configuration.GetSection(SectionName).Bind(options);
        }
    }
}
