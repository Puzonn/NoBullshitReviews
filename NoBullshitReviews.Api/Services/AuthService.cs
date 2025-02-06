using NoBullshitReviews.Models;
using System.Net.Http.Headers;
using System.Text.Json;

namespace NoBullshitReviews.Services;

public class AuthService
{
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public AuthService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<string> GetToken(string code)
    {
        const string endpoint = "https://discord.com/api/oauth2/token";
        var client = _httpClientFactory.CreateClient();

        var content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("client_id", _configuration["Discord:ClientId"]),
            new KeyValuePair<string, string>("client_secret", _configuration["Discord:ClientSecret"]),
            new KeyValuePair<string, string>("grant_type", "authorization_code"),
            new KeyValuePair<string, string>("code", code),
            new KeyValuePair<string, string>("redirect_uri", _configuration["Discord:RedirectUri"]),
        });

        var response = await client.PostAsync(endpoint, content);
        var body = await response.Content.ReadAsStringAsync();

        var jsonObject = JsonSerializer.Deserialize<JsonDocument>(body);

        if(jsonObject is null)
        {
            throw new Exception("Error while deserializing discord response body");
        }

        var token = jsonObject.RootElement.GetProperty("access_token").GetString();

        return token;
    }

    public async Task<DiscordUser> GetDiscordUser(string accessToken)
    {
        const string endpoint = "https://discord.com/api/oauth2/@me";
        var client = _httpClientFactory.CreateClient();

        var request = new HttpRequestMessage(HttpMethod.Get, endpoint);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await client.SendAsync(request);
        var body = await response.Content.ReadAsStringAsync();
            
        var root = JsonSerializer.Deserialize<JsonDocument>(body).RootElement;
        var user = root.GetProperty("user");

        string avatar = user.GetProperty("avatar").GetString();
        string username = user.GetProperty("username").GetString();
        string userId = user.GetProperty("id").GetString();
        string avatarUrl = $"https://cdn.discordapp.com/avatars/{userId}/{avatar}.png";

        return new DiscordUser()
        {
            Username = username,
            DiscordId = long.Parse(userId),
            AvatarUrl = avatarUrl,
        };
    }
}