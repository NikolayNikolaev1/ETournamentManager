namespace API.Domains.Game.Models
{
    using Core.Mapper;
    using Data.Models;

    public class GameListingViewModel : IMapFrom<Game>
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;
    }
}
