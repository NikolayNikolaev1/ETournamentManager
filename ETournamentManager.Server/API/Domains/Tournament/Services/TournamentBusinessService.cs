﻿namespace API.Domains.Tournament.Services
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;
    using static Data.Models.Tournament;

    public class TournamentBusinessService(
        ETournamentManagerDbContext dbContext,
        IMapper mapper,
        ITournamentDataService tournamentDataService) : ITournamentBusinessService
    {
        public async Task Create(TournamentCreateModel model)
        {
            Tournament tournament = new Tournament
            {
                Name = model.Name,
                Description = model.Description,
                Type = model.Type,
                MinTeamMembers = model.MinTeamMembers,
                GameId = Guid.Parse(model.GameId),
                CreatorId = Guid.Parse("8108d0b2-42bb-4b84-8f06-3aca8d112873") // TODO: Change with userManager.CurrentUserId
            };

            await dbContext.Tournaments.AddAsync(tournament);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(string id)
        {
            Tournament? tournament = await tournamentDataService.GetById(id);

            if (tournament == null)
            {
                return;
            }
            // TODO: Check if tournament.creatorId == userManager.CurrentUserId


            dbContext.Tournaments.Remove(tournament);
            await dbContext.SaveChangesAsync();
        }

        public async Task Edit(TournamentCreateModel model)
        {
            Tournament? tournament = await tournamentDataService.GetById(model.Id);

            if (tournament == null)
            {
                return;
            }

            // TODO: Check if tournament.creatorId == userManager.CurrentUserId

            tournament.Name = model.Name;
            tournament.Description = model.Description;

            dbContext.Tournaments.Update(tournament);
            await dbContext.SaveChangesAsync();
        }

        public async Task<ICollection<TournamentListingModel>> GetAll()
            => await dbContext
            .Tournaments
            .ProjectTo<TournamentListingModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        public async Task<TournamentListingModel> GetById(string id)
            => mapper.Map<TournamentListingModel>(await tournamentDataService.GetById(id));

        public async Task Join(TournamentParticipantModel model)
        {
            switch (model.ParticipantType)
            {
                case TournamentType.SinglePlayer:
                    TournamentPlayer? tournamentPlayer = await tournamentDataService
                        .GetTournamentPlayer(model.TournamentId, model.ParticipantId);

                    if (tournamentPlayer != null) return;

                    dbContext.TournamentPlayers.Add(new TournamentPlayer
                    {
                        TournamentId = Guid.Parse(model.TournamentId),
                        PlayerId = Guid.Parse(model.ParticipantId)
                    });
                    break;
                case TournamentType.Team:
                    TournamentTeam? tournamentTeam = await tournamentDataService
                        .GetTournamentTeam(model.TournamentId, model.ParticipantId);

                    if (tournamentTeam != null) return;

                    dbContext.TournamentTeams.Add(new TournamentTeam
                    {
                        TournamentId = Guid.Parse(model.TournamentId),
                        TeamId = Guid.Parse(model.ParticipantId)
                    });
                    break;
            }
        }

        public async Task Leave(TournamentParticipantModel model)
        {
            switch (model.ParticipantType)
            {
                case TournamentType.SinglePlayer:
                    TournamentPlayer? tournamentPlayer = await tournamentDataService
                        .GetTournamentPlayer(model.TournamentId, model.ParticipantId);

                    if (tournamentPlayer == null) return;

                    dbContext.TournamentPlayers.Remove(tournamentPlayer);
                    break;
                case TournamentType.Team:
                    TournamentTeam? tournamentTeam = await tournamentDataService
                        .GetTournamentTeam(model.TournamentId, model.ParticipantId);

                    if (tournamentTeam == null) return;

                    dbContext.TournamentTeams.Remove(tournamentTeam);
                    break;
            }
        }
    }
}
