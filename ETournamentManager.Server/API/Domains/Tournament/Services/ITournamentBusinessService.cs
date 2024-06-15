﻿namespace API.Domains.Tournament.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface ITournamentService : IService
    {
        Task Create(TournamentCreateModel model);

        Task Delete(string id);

        Task Edit(TournamentCreateModel model);

        Task<ICollection<TournamentListingModel>> GetAll();

        Task<TournamentListingModel> GetById(string id);

        Task Join(TournamentParticipantModel model);

        Task Leave(TournamentParticipantModel model);
    }
}
