namespace API.Domains.Tournament.Services
{
    using API.Domains.Team.Models;
    using API.Domains.Team.Services;
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
        ITeamDataService teamDataService,
        IGameDataService gameDataService) : ITournamentBusinessService
    {
        private readonly CurrentUserModel currentUser = authService.GetCurrentUser();

        public async Task<TournamentBaseModel> Create(TournamentManagementModel model)
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

            return mapper.Map<TournamentBaseModel>(tournament);
        }

        public async Task Delete(string id)
        {
            Tournament? tournament = await tournamentDataService.GetById(id);

            if (tournament == null)
            {
                throw new BusinessServiceException("Tournament not found.", Status404NotFound);
            }

            if (tournament.CreatorId != Guid.Parse(currentUser.Id) && currentUser.RoleName != ADMIN)
            {
                throw new BusinessServiceException("User is not creator of tournament.", Status401Unauthorized);
            }

            if (tournament.Active || tournament.Finished)
            {
                throw new BusinessServiceException("Can not delete started tournaments.");
            }

            dbContext.Tournaments.Remove(tournament);
            await dbContext.SaveChangesAsync();
        }

        public async Task<TournamentBaseModel> Edit(string id, TournamentManagementModel model)
        {
            Tournament? tournament = await tournamentDataService.GetById(id);

            if (tournament == null)
            {
                throw new BusinessServiceException(TOURNAMENT_NOT_FOUND, Status404NotFound);
            }

            if (currentUser.RoleName != ADMIN && !tournament.CreatorId.Equals(Guid.Parse(currentUser.Id)))
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

            if (tournament.Teams.Count == 0)
            {
                tournament.Type = model.Type;
            }

            dbContext.Tournaments.Update(tournament);
            await dbContext.SaveChangesAsync();

            return mapper.Map<TournamentBaseModel>(tournament);
        }

        public async Task Finish(string id)
        {
            Tournament? tournament = await tournamentDataService.GetById(id);

            if (tournament == null)
            {
                throw new BusinessServiceException(TOURNAMENT_NOT_FOUND, Status404NotFound);
            }

            if (!tournament.CreatorId.Equals(Guid.Parse(currentUser.Id))
                && !currentUser.RoleName.Equals(ADMIN))
            {
                throw new BusinessServiceException(USER_NOT_CREATOR, Status401Unauthorized);
            }

            var finalsRound = tournament.Rounds.FirstOrDefault(r => r.Stage == Round.RoundStage.Finals);

            if (!tournament.Active || finalsRound == null || !finalsRound.Teams.Any(t => t.IsWinner))
            {
                throw new BusinessServiceException("Tournament can not be ended!", Status400BadRequest);

            }

            tournament.Active = false;
            tournament.Finished = true;

            dbContext.Tournaments.Update(tournament);
            await dbContext.SaveChangesAsync();
        }

        public async Task<ICollection<TournamentListingModel>> GetAll(TournamentQueryParams queryParams)
        {
            ICollection<string> userIds = new HashSet<string>();
            ICollection<string> teamIds = new HashSet<string>();
            ICollection<string> gameIds = new HashSet<string>();

            if (queryParams.UserIds != null)
            {
                userIds = queryParams.UserIds.Split(", ").ToList();
            }

            if (queryParams.TeamIds != null)
            {
                teamIds = queryParams.TeamIds.Split(", ").ToList();
            }

            if (queryParams.GameIds != null)
            {
                gameIds = queryParams.GameIds.Split(", ").ToList();
            }


            IQueryable<Tournament> tournaments = dbContext
                .Tournaments
                .AsQueryable()
                .Include(t => t.Teams);

            if (userIds.Count > 0)
            {
                tournaments = tournaments.Where(t => userIds.Contains(t.CreatorId.ToString()));
            }

            if (teamIds.Count > 0)
            {
                tournaments = tournaments.Where(t => t.Teams.Any(t => teamIds.Contains(t.TeamId.ToString())));
            }

            if (gameIds.Count > 0)
            {
                tournaments = tournaments.Where(t => gameIds.Contains(t.GameId.ToString()));
            }

            if (queryParams.Search != null)
            {
                tournaments = tournaments.Where(t => t.Name.ToLower().Contains(queryParams.Search.ToLower()));
            }

            return await tournaments
            .ProjectTo<TournamentListingModel>(mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<ICollection<TournamentRoundsModel>> GetAllWithRounds()
        {
            return await dbContext
                .Tournaments
                .Where(t => t.Active)
                .Include(t => t.Rounds)
                .Include(t => t.Teams)
                .ThenInclude(t => t.Team)
                .Include(t => t.Game)
                .Include(t => t.Creator)
                .ProjectTo<TournamentRoundsModel>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<TournamentListingModel> GetById(string id)
            => mapper.Map<TournamentListingModel>(await tournamentDataService.GetById(id));

        public async Task<TeamBaseModel> Join(TournamentTeamModel model)
        {
            Tournament? tournament = await tournamentDataService.GetById(model.TournamentId);
            Team? team = await teamDataService.GetById(model.TeamId);

            if (tournament == null)
            {
                throw new BusinessServiceException(TOURNAMENT_NOT_FOUND, Status404NotFound);
            }

            if (team == null)
            {
                throw new BusinessServiceException("Team not found", Status404NotFound);
            }

            if (tournament.Active && tournament.Finished)
            {
                throw new BusinessServiceException("Can not join an active tournament.");
            }

            if (tournament.CreatorId != Guid.Parse(currentUser.Id) && currentUser.RoleName != ADMIN)
            {
                throw new BusinessServiceException("User is not creator of tournament.", Status401Unauthorized);
            }

            if (team.Members.Any(m => tournament.Teams.SelectMany(t => t.Team.Members.Select(tm => tm.MemberId)).Contains(m.MemberId)))
            {
                throw new BusinessServiceException("Team member should not be in more than one team.", Status400BadRequest);
            }

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

            return mapper.Map<TeamBaseModel>(team);
        }

        public async Task Leave(TournamentTeamModel model)
        {
            TournamentTeam? tournamentTeam = await tournamentDataService.GetTournamentTeam(model.TournamentId, model.TeamId);

            if (tournamentTeam == null)
            {
                throw new BusinessServiceException("Team not found in tournament", Status404NotFound);
            }

            if (tournamentTeam.Tournament.Active || tournamentTeam.Tournament.Finished)
            {
                throw new BusinessServiceException("Can not leave an active tournament.");
            }

            if (tournamentTeam.Tournament.CreatorId != Guid.Parse(currentUser.Id)
                && tournamentTeam.Team.Members.First(m => m.IsCaptain).MemberId != Guid.Parse(currentUser.Id)
                && currentUser.RoleName != ADMIN)
            {
                throw new BusinessServiceException("Only tournament creator or team captain can remove team from tournament", Status401Unauthorized);
            }

            dbContext.TournamentTeams.Remove(tournamentTeam);
            await dbContext.SaveChangesAsync();
        }
    }
}
