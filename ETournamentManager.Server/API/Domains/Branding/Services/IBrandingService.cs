namespace API.Domains.Branding.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface IBrandingService : IService
    {
        Task EditInfo(InfoManagementModel model);

        Task EditTheme(ThemeManagementModel model);

        Task EditAccess(AccessManagementModel model);

        Task<BrandingListingModel> Get();
    }
}
