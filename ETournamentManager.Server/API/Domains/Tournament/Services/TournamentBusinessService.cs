namespace API.Domains.Tournament.Services
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
                MinTeamMembers = model.Type == TournamentType.Team ? model.MinTeamMembers : 1,
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

        public async Task Join(TournamentTeamModel model)
        {
            TournamentTeam? tournamentTeam = await tournamentDataService
                .GetTournamentTeam(model.TournamentId, model.TeamId);

            if (tournamentTeam != null) return; // TODO: Add error msg - team already in tournament

            dbContext.TournamentTeams.Add(new TournamentTeam
            {
                TournamentId = Guid.Parse(model.TournamentId),
                TeamId = Guid.Parse(model.TeamId)
            });
            await dbContext.SaveChangesAsync();
        }

        public async Task Leave(TournamentTeamModel model)
        {
            TournamentTeam? tournamentTeam = await tournamentDataService
                        .GetTournamentTeam(model.TournamentId, model.TeamId);

            if (tournamentTeam == null) return; //TODO: add error msg - team not in tournament

            dbContext.TournamentTeams.Remove(tournamentTeam);
            await dbContext.SaveChangesAsync();
        }
    }
}
