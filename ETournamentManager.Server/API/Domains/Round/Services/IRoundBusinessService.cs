namespace API.Domains.Round.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface IRoundBusinessService : IService
    {
        Task End(RoundWinnerModel model);

        Task<ICollection<RoundListingModel>> Generate(string tournamentId);

        Task<ICollection<RoundListingModel>> GetAll(string tournamentId);
    }
}
