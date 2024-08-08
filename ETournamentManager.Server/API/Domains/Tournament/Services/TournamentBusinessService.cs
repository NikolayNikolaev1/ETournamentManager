namespace API.Domains.Tournament.Services
{
    using Auth.Models;
    using Auth.Services;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Core.Exceptions;
    using Data;
    using Data.Models;
    using Game.Services;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Collections.Generic;
    using static Core.Common.Constants.ErrorMessages.Game;
    using static Core.Common.Constants.ErrorMessages.Tournament;
    using static Core.Common.Constants.Roles;
    using static Data.Models.Tournament;
    using static Microsoft.AspNetCore.Http.StatusCodes;
    using Tournament = Data.Models.Tournament;

    public class TournamentBusinessService(
        ETournamentManagerDbContext dbContext,
        IMapper mapper,
        IAuthService authService,
        ITournamentDataService tournamentDataService,
        IGameDataService gameDataService) : ITournamentBusinessService
    {
        private readonly CurrentUserModel currentUser = authService.GetCurrentUser();

        public async Task Create(TournamentManagementModel model)
        {
            if (!await gameDataService.ContainsId(model.GameId))
            {
                throw new BusinessServiceException(GAME_NOT_FOUND, StatusCodes.Status404NotFound);
            }

            Tournament tournament = new Tournament
            {
                Name = model.Name,
                Description = model.Description,
                Type = model.Type,
                MinTeamMembers = model.Type == TournamentType.Team ? model.MinTeamMembers : 1,
                GameId = Guid.Parse(model.GameId),
                CreatorId = Guid.Parse(currentUser.Id),
            };

            await dbContext.Tournaments.AddAsync(tournament);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(string id)
        {
            Tournament? tournament = await tournamentDataService.GetById(id);

            if (tournament == null)
            {
                throw new BusinessServiceException("Tournament not found.", Status404NotFound);
            }

            if (tournament.CreatorId != Guid.Parse(currentUser.Id) || currentUser.RoleName != ADMIN)
            {
                throw new BusinessServiceException("User is not creator of tournament.", Status401Unauthorized);
            }

            if (tournament.Active)
            {
                throw new BusinessServiceException("Can not delete started tournaments.");
            }

            dbContext.Tournaments.Remove(tournament);
            await dbContext.SaveChangesAsync();
        }

        public async Task Edit(string id, TournamentManagementModel model)
        {
            Tournament? tournament = await tournamentDataService.GetById(id);

            if (tournament == null)
            {
                throw new BusinessServiceException(TOURNAMENT_NOT_FOUND, Status404NotFound);
            }

            if (!tournament.CreatorId.Equals(Guid.Parse(currentUser.Id)))
            {
                throw new BusinessServiceException(USER_NOT_CREATOR, Status401Unauthorized);
            }

            if (!await gameDataService.ContainsId(model.GameId))
            {
                throw new BusinessServiceException(GAME_NOT_FOUND, Status404NotFound);
            }

            tournament.Name = model.Name;
            tournament.Description = model.Description;
            tournament.GameId = Guid.Parse(model.GameId);

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

            if (tournamentTeam != null)
            {
                throw new BusinessServiceException("Team already in tournament");
            }

            dbContext.TournamentTeams.Add(new TournamentTeam
            {
                TournamentId = Guid.Parse(model.TournamentId),
                TeamId = Guid.Parse(model.TeamId)
            });
            await dbContext.SaveChangesAsync();
        }

        public async Task Leave(TournamentTeamModel model)
        {
            TournamentTeam? tournamentTeam = await tournamentDataService.GetTournamentTeam(model.TournamentId, model.TeamId);

            if (tournamentTeam == null)
            {
                throw new BusinessServiceException("Team not found in tournament", Status404NotFound);
            }

            if (tournamentTeam.Tournament.CreatorId != Guid.Parse(currentUser.Id)
                || tournamentTeam.Team.Members.First(m => m.IsCaptain).MemberId != Guid.Parse(currentUser.Id))
            {
                throw new BusinessServiceException("Only tournament creator or team captain can remove team from tournament", Status401Unauthorized);
            }

            dbContext.TournamentTeams.Remove(tournamentTeam);
            await dbContext.SaveChangesAsync();
        }
    }
}
