namespace Core.Mapper
{
    using AutoMapper;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            var test = AppDomain
                .CurrentDomain
                .GetAssemblies()
                .ToList();

            foreach (var item in test)
            {
                var t = item.GetName().Name;
            }

            var allTypes = AppDomain
                .CurrentDomain
                .GetAssemblies()
                .Where(a => a.GetName().Name.Contains("API"))
                .SelectMany(a => a.GetTypes());

            allTypes
                .Where(t => t.IsClass && !t.IsAbstract && t
                    .GetInterfaces()
                    .Where(i => i.IsGenericType)
                    .Select(i => i.GetGenericTypeDefinition())
                    .Contains(typeof(IMapFrom<>)))
                .Select(t => new
                {
                    Destination = t,
                    Source = t
                        .GetInterfaces()
                        .Where(i => i.IsGenericType)
                        .Select(i => new
                        {
                            Definition = i.GetGenericTypeDefinition(),
                            Arguments = i.GetGenericArguments()
                        })
                        .Where(i => i.Definition == typeof(IMapFrom<>))
                        .SelectMany(i => i.Arguments)
                        .First(),
                })
                .ToList()
                .ForEach(mapping => this.CreateMap(mapping.Source, mapping.Destination));

            allTypes
                .Where(t => t.IsClass
                    && !t.IsAbstract
                    && typeof(ICustomMapping).IsAssignableFrom(t))
                .Select(Activator.CreateInstance)
                .Cast<ICustomMapping>()
                .ToList()
                .ForEach(mapping => mapping.ConfigureMapping(this));
        }
    }
}
