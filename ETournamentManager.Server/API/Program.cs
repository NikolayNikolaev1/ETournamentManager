using Core.Configuration;
using Core.Extensions;
using Core.Extensions.Authentication;
using Core.Mapper;
using Data;
using Data.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddScoped<DbContext, ETournamentManagerDbContext>()
    .AddScoped<JwtConfig, JwtConfig>()
    .AddDbContext<ETournamentManagerDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")))
    .AddDomainService()
    .AddAutoMapper(typeof(AutoMapperProfile))
    //.Configure<JwtConfig>(builder.Configuration.GetSection("JwtConfig"))
    .ConfigureOptions<JwtOptionsExtensions>().ConfigureOptions<JwtBearerOptionsExtensions>()
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();
//.AddJwtBearer(jwt =>
//{
//    byte[] key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtConfig:Secret").Value ?? "");
//    jwt.SaveToken = true;
//    jwt.TokenValidationParameters = new TokenValidationParameters()
//    {
//        ValidateIssuer = true,
//        IssuerSigningKey = new SymmetricSecurityKey(key),
//        ValidateIssuerSigningKey = true,
//        ValidateAudience = false,
//        RequireExpirationTime = false,
//        ValidateLifetime = false,
//    };
//});
//.AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

//builder.Services


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
    //.AddDefaultTokenProviders()
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
    .UseDatabaseMigration()
    .UseHttpsRedirection()
    .UseAuthentication()
    .UseAuthorization()
    .UseCors("Client");

app.MapControllers();

app.Run();
