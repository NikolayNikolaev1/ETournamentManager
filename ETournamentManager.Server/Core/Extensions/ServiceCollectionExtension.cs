namespace Core.Extensions
{
    using Core.Common.Data.Interfaces;
    using Microsoft.Extensions.DependencyInjection;

    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddDomainService(this IServiceCollection services)
        {
            AppDomain
                .CurrentDomain
                .GetAssemblies()
                .SelectMany(a => a.GetExportedTypes()
                    .Where(t => t.IsClass && !t.IsAbstract)
                    .Where(t => typeof(IService).IsAssignableFrom(t))
                    .Select(t => new
                    {
                        Interface = t.GetInterface($"I{t.Name}")!,
                        Implementation = t
                    }))
                .ToList()
                .ForEach(s => services.AddTransient(s.Interface, s.Implementation));

            return services;
        }
    }
}
