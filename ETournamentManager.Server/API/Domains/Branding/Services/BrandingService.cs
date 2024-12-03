namespace API.Domains.Branding.Services
{
    using AutoMapper;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class BrandingService(
        ETournamentManagerDbContext dbContext,
        IMapper mapper) : IBrandingService
    {
        public async Task EditAccess(AccessManagementModel model)
        {
            Branding branding = await dbContext.Branding.FirstAsync();

            branding.AccessTournamentTable = model.AccessTournamentTable;
            branding.AccessTeamTable = model.AccessTeamTable;
            branding.AccessTeamDetails = model.AccessTeamDetails;
            branding.AccessTournamentDetails = model.AccessTournamentDetails;

            dbContext.Branding.Update(branding);
            await dbContext.SaveChangesAsync();
        }

        public async Task EditInfo(InfoManagementModel model)
        {
            Branding branding = await dbContext.Branding.FirstAsync();

            branding.PlatformName = model.PlatformName;
            branding.ContactLink = model.ContactLink;
            branding.ContactEmail = model.ContactEmail;

            dbContext.Branding.Update(branding);
            await dbContext.SaveChangesAsync();
        }

        public async Task EditTheme(ThemeManagementModel model)
        {
            Branding branding = await dbContext.Branding.FirstAsync();

            branding.PrimaryColor = model.PrimaryColor;
            branding.SecondaryColor = model.SecondaryColor;
            branding.TextColor = model.TextColor;
            branding.BackgroundColor = model.BackgroundColor;

            dbContext.Branding.Update(branding);
            await dbContext.SaveChangesAsync();
        }

        public async Task<BrandingListingModel> Get()
            => mapper.Map<BrandingListingModel>(await dbContext.Branding.FirstAsync());
    }
}
