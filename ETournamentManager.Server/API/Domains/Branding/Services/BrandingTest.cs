using Core.Testing;
using FluentAssertions;
using Xunit;

namespace API.Domains.Branding.Services
{
    public class BrandingTest
    {

        [Fact]
        public async Task Test()
        {
            var dbContext = Testing.CreateDatabaseContext();
            var mapper = Testing.CreateMapper();

            var brandingService = new BrandingService(dbContext, mapper);

            var branding = await brandingService.Get();

            branding.Should().BeNull();
        }
    }
}
