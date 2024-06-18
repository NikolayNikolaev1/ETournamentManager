﻿namespace API.Domains.Round.Models
{
    using AutoMapper;
    using Core.Mapper;
    using Data.Models;
    using Team.Models;
    using static Data.Models.Round;

    public class RoundListingModel : IMapFrom<Round>, ICustomMapping
    {
        public string Id { get; set; } = null!;

        public RoundType Type { get; set; }

        public string TournamentId { get; set; } = null!;

        public string? WinnerId { get; set; }

        public RoundListingModel? NextRound { get; set; }

        public ICollection<TeamListingModel> Teams { get; set; } = new List<TeamListingModel>();

        public void ConfigureMapping(Profile mapper)
            => mapper.CreateMap<Round, RoundListingModel>()
            .ForMember(r => r.WinnerId,
                opt => opt.MapFrom(
                    r => r.Tournament.Type == Tournament.TournamentType.Team 
                    ? r.Teams.First(t => t.IsWinner).TeamId 
                    : r.Players.First(t => t.IsWinner).PlayerId))
            .ForMember(r => r.Teams,
                opt => opt.MapFrom(r => r.Teams.Select(t => t.Team)));
    }
}
