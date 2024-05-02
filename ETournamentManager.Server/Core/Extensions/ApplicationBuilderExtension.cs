namespace Core.Extensions
{
    using Data;
    using Data.Models;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using static Common.Constants;

    public static class ApplicationBuilderExtension
    {
        public static IApplicationBuilder UseDatabaseMigration(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();

            // Checks for database changes and migrates them everytime the program runs.
            serviceScope.ServiceProvider.GetService<ETournamentManagerDbContext>().Database.Migrate();

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
