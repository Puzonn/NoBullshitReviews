using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoBullshitReviews.Database;
using NoBullshitReviews.Models.Database;
using NoBullshitReviews.Models.Requests;
using NoBullshitReviews.Models.Responses;
using NoBullshitReviews.Services;
using System.Text.RegularExpressions;

namespace NoBullshitReviews.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{
    private readonly CDNService _cdn;
    private readonly ReviewContext _context;
    private readonly FeedService _feedService;

    public GameController(ReviewContext context, CDNService cdn, FeedService feedService)
    {
        _feedService = feedService;
        _cdn = cdn;
        _context = context;
    }

    [Authorize]
    [HttpPost("create-base")]
    public async Task<ActionResult<DbGame>> CreateGame([FromForm] GameCreationRequest request)
    {
        DbGame game = DbGame.FromRequest(request);

        if (await _context.Games.AnyAsync(x => x.Title == request.Title))
        {
            return BadRequest("Game already exist with given title");
        }

        try
        {
            string? path = await _cdn.CreateFile(Request, request.Image);

            if (string.IsNullOrEmpty(path))
            {
                return BadRequest("An error occurred while uploading a file.");
            }

            game.ImagePath = path;
        }

        catch (Exception ex)
        {
            BadRequest(ex.Message);
        }

        game.RouteName = Regex.Replace(game.Title.ToLower(), @"[^a-zA-Z0-9\s]", "").Replace(" ", "-");
        game.CreatedAt = DateTime.UtcNow;

        await _context.AddAsync(game);
        await _context.SaveChangesAsync();

        return Ok(game);
    }

    [HttpGet("{route}")]
    public async Task<ActionResult<DbGame?>> FetchGame(string route)
    {
        string filtred = Regex.Replace(route.ToLower(), @"[^a-zA-Z0-9\s]", "").Replace(" ", "-");

        DbGame? game = await _context.Games.Where(x => x.RouteName == filtred).FirstOrDefaultAsync();

        if (game is null)
        {
            return NotFound($"Game with title '{route}' not found.");
        }

        return Ok(game);
    }

    [HttpGet("/latest")]
    public async Task<ActionResult<GameResponse[]>> FetchGames()
    {
        var latest = await _context.Games
           .OrderByDescending(x => x.CreatedAt)
           .Take(10)
           .ToListAsync();

        return Ok(latest.Select(x => GameResponse.FromGame(x)));
    }
}