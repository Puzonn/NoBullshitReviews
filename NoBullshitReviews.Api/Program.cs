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

builder.Services.AddLogging();

builder.Services.AddHttpClient();

builder.Services.AddAuthentication(options =>
{
    options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
});

builder.Services.AddMemoryCache();
builder.Services.AddScoped<CDNService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddDbContext<ReviewContext>();
builder.Services.AddScoped<FeedService>();

builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ReviewContext>();
    await context.Database.EnsureCreatedAsync();
}

app.UseStaticFiles();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseCors(CORS);

app.UseAuthorization();

app.MapControllers();

app.Run();
