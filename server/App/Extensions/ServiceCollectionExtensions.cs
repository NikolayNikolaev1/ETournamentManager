namespace App.Extensions
{
    using System.Reflection;

    internal static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDomainService(
            this IServiceCollection services)
        {

            Assembly
                .Load($"Services")
                .GetTypes()
                .Where(t => t.IsClass && t.GetInterfaces().Any(i => i.Name.Equals($"I{t.Name}")))
                .Select(t => new
                {
                    Interface = t.GetInterface($"I{t.Name}"),
                    Implementation = t
                })
                .ToList()
                .ForEach(s =>
                {
                    if (s.Interface != null) services.AddTransient(s.Interface, s.Implementation);
                });

            return services;
        }
    }
}
