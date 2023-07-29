namespace App.Extensions
{
    using Authentication;
    using Microsoft.Extensions.Options;

    public class JwtOptionsExtensions : IConfigureOptions<JwtOptions>
    {
        private const string SectionName = "Jwt";
        private readonly IConfiguration configuration;

        public JwtOptionsExtensions(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        void IConfigureOptions<JwtOptions>.Configure(JwtOptions options)
        {
            this.configuration.GetSection(SectionName).Bind(options);
        }
    }
}
