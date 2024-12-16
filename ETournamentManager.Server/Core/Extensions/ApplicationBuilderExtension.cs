namespace Core.Extensions
{
    using Common.Data.Interfaces;
    using Data;
    using Data.Models;
    using Data.Seeds;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Middlewares;
    using System.Security.Claims;
    using static Common.Constants;

    public static class ApplicationBuilderExtension
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

        public static WebApplication UseCustomExceptionHandling(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler(errorApp => errorApp.Run(new DevelopmentExceptionMiddleware().Get));
            }

            return app;
        }


        public static IServiceCollection AddHttpContextService(this IServiceCollection services)
            => services.AddHttpContextAccessor()
            .AddTransient(s =>
                s.GetRequiredService<IHttpContextAccessor>().HttpContext?.User ?? new ClaimsPrincipal());

        public static IApplicationBuilder UseDatabaseMigration(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();

            // Checks for database changes and migrates them everytime the program runs.
            var dbContext = serviceScope.ServiceProvider.GetService<ETournamentManagerDbContext>();
            dbContext!.Database.Migrate();

            if (dbContext.Branding.Count() == 0)
            {
                Task.Run(async () =>
                {
                    await dbContext.Branding.AddAsync(new Branding
                    {
                        PlatformName = "ETournamentManager",
                        PrimaryColor = "7ab2d3",
                        SecondaryColor = "b9e5e8",
                        TextColor = "4a628a",
                        BackgroundColor = "dff2eb",
                        AccessTeamDetails = true,
                        AccessTournamentDetails = true,
                        AccessTeamTable = true,
                        AccessTournamentTable = true,
                        ContactLink = "",
                        ContactEmail = ""
                    });
                    await dbContext.SaveChangesAsync();
                }).Wait();
            }

            var userManager = serviceScope.ServiceProvider.GetService<UserManager<User>>();
            var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<Role>>();

            Task
                .Run(async () =>
                {
                    var roleNames = typeof(Roles).GetFields();
                    // Using reflection to get all roles and add them to db.
                    foreach (var roleName in roleNames)
                    {
                        await CreateRoleAsync(userManager, roleManager, roleName.Name);
                    }
                })
                .Wait();


            //UserSeeder.Seed(serviceScope.ServiceProvider);

            return app;
        }

        // Creates a role if it does not exist with given roleName.
        private static async Task CreateRoleAsync(
           UserManager<User> userManager,
           RoleManager<Role> roleManager,
           string roleName)
        {
            bool roleExists = await roleManager.RoleExistsAsync(roleName);

            if (!roleExists)
            {
                await roleManager.CreateAsync(new Role
                {
                    Name = roleName
                });
            }

            // If role name is administrator, creates an administrator account.
            if (roleName.Equals(Roles.ADMIN))
            {
                await CreateAdminAsync(userManager);
            }
        }

        // Creates default administrator account if there is none.
        private static async Task CreateAdminAsync(UserManager<User> userManager)
        {
            User adminUser = await userManager.FindByEmailAsync(AdminCredentials.Email);

            if (adminUser == null)
            {
                adminUser = new User
                {
                    Email = AdminCredentials.Email,
                    UserName = "admin",
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var user = await userManager.CreateAsync(adminUser, AdminCredentials.Password);
                await userManager.AddToRoleAsync(adminUser, Roles.ADMIN);
            }
        }
    }
}
