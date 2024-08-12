namespace API.Domains.Team.Models
{
    using Core.Mapper;
    using Data.Models;

    public class TeamBaseModel : IMapFrom<Team>
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;
    }
}
