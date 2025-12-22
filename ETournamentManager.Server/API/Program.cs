using Core.Configuration;
using Core.Extensions;
using Core.Extensions.Authentication;
using Core.Mapper;
using Data;
using Data.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

using static Core.Common.Constants.AuthConfig;

var builder = WebApplication.CreateBuilder(args);


builder.Services
    .AddScoped<DbContext, ETournamentManagerDbContext>()
    .AddScoped<JwtConfig, JwtConfig>()
    .AddDbContext<ETournamentManagerDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")))
    .AddDomainService()
    .AddHttpContextService()
    .AddAutoMapper(typeof(AutoMapperProfile))
    .ConfigureOptions<JwtOptionsExtensions>().ConfigureOptions<JwtBearerOptionsExtensions>()
    .AddAuthorization()
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddGoogle(googleOptions =>
    {
        googleOptions.ClientId = builder.Configuration["Authentication:Google:ClientId"];
        googleOptions.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
        googleOptions.CallbackPath = "/signin-google";
    })
    .AddJwtBearer();

builder.Services
    .AddCors(options => options.AddPolicy("Client",
        policy => policy
        .WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()))
    .AddEndpointsApiExplorer()
    .AddSwaggerGen()
    .AddControllers();

builder.Services
    .AddCors(options => options.AddPolicy("Client", policy => policy
        .WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()));

builder.Services
    .AddIdentity<User, Role>(options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.SignIn.RequireConfirmedAccount = false;
    })
    .AddRoles<Role>()
    .AddEntityFrameworkStores<ETournamentManagerDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app
        .UseSwagger()
        .UseSwaggerUI();
}


app
    .UseCustomExceptionHandling()
    .UseDatabaseMigration()
    .UseHttpsRedirection()
    .UseCors("Client")
    .UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(builder.Environment.ContentRootPath, STATIC_FILES_PATH)),
        RequestPath = "/UploadImages"
    })
    .UseAuthentication()
    .UseAuthorization();

app.MapControllers();

app.Run();
