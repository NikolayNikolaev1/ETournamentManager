namespace Core.Common.Data
{
    using global::Data;
    using Interfaces;
    using Microsoft.EntityFrameworkCore;

    public class DataService<TEntity> : IDataService<TEntity>
        where TEntity : class
    {
        private readonly ETournamentManagerDbContext dbContext;

        public DataService(ETournamentManagerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        protected DbSet<TEntity> DbSet
            => this.dbContext.Set<TEntity>();
        

        public async Task Add(TEntity entity)
        {
            await this.dbContext.AddAsync(entity);
            await this.SaveChanges();
        }

        public async Task Remove(TEntity entity)
        {
            this.dbContext.Remove(entity);
            await this.SaveChanges();
        }

        public async Task SaveChanges()
            => await this.dbContext.SaveChangesAsync();

        public async Task Update(TEntity entity)
        {
            this.dbContext.Update(entity);
            await this.SaveChanges();
        }
    }
}
