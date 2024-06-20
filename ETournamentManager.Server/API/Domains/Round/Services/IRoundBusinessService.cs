namespace API.Domains.Round.Services
{
    using Models;

    public interface IRoundBusinessService
    {
        Task End(string roundId, string winnerId);

        Task<ICollection<RoundListingModel>> Generate(string tournamentId);

        Task<ICollection<RoundListingModel>> GetAll(string tournamentId);
    }
}
