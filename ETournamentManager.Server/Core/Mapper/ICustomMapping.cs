namespace Core.Mapper
{
    using AutoMapper;

    public interface ICustomMapping
    {
        void ConfigureMapping(Profile mapper);
    }
}
