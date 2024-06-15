namespace API.Domains.Game.Models
{
    using Core.Mapper;
    using Data.Models;

    public class GameListingModel : IMapFrom<Game>
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;
    }
}
