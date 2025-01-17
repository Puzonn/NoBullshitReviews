using Microsoft.AspNetCore.Authentication.Cookies;
using NoBullshitReviews.Database;
using NoBullshitReviews.Services;

const string CORS = "AllowCors";

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddCors(options =>
{
    options.AddPolicy(CORS, policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
        .AllowAnyHeader()
        .AllowCredentials()
        .AllowAnyMethod();
    });
});

builder.Services.AddHttpClient();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromHours(20);
        options.Cookie.HttpOnly = true;
    });

builder.Services.AddScoped<AuthService>();
builder.Services.AddDbContext<ReviewContext>();
builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseCors(CORS);

app.UseAuthorization();

app.MapControllers();

app.Run();
