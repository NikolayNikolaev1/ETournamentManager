namespace Core.Common.Data.Interfaces
{
    public interface IDataService<TEntity>
        where TEntity : class
    {
        Task Add(TEntity entity);

        Task Remove(TEntity entity);

        Task SaveChanges();

        Task Update(TEntity entity);
    }
}
