using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoBullshitReviews.Database;
using NoBullshitReviews.Models.Database;
using NoBullshitReviews.Models.Feeds;
using NoBullshitReviews.Models.Requests;
using NoBullshitReviews.Models.Responses;
using NoBullshitReviews.Services;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace NoBullshitReviews.Controllers;

[ApiController]
[Route("[controller]")]
public class ReviewController : ControllerBase
{
    private readonly ReviewContext _context;
    private readonly FeedService _reviewService;

    public ReviewController(ReviewContext context, FeedService reviewService)
    {
        _reviewService = reviewService;
        _context = context;
    }

    [HttpGet("query")]
    public async Task<ActionResult<Dash[]>> Query([FromQuery] string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            return BadRequest("Search query cannot be empty.");
        }

        string lowerQuery = query.ToLower();

        return Ok(await _context.GameReviews
            .Where(x => !string.IsNullOrEmpty(x.Title) && x.Title.ToLower().Contains(lowerQuery))
            .Take(5)
            .Select(x => Dash.FromGameReview(x))
            .ToArrayAsync());
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<ActionResult<Dash>> CreateReview([FromForm] GameReviewCreationRequest request)
    {
        var principal = HttpContext.User;
        DbUser? user = null;
        
        if(principal?.Identity?.IsAuthenticated ?? false)
        {
            var id = principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            if(id is null)
            {
                return Unauthorized();
            }

            user = await _context.Users.FindAsync(int.Parse(id));
        }

        if (user is null)
        {
            return Unauthorized();
        }

        DbGame? game = await _context.Games.Where(x => x.Title == request.GameTitle).FirstOrDefaultAsync();

        if(game is null)
        {
            return BadRequest("Game with given title dose not exist");
        }

        DbGameReview review = DbGameReview.FromRequest(request);
        review.Game = game;
        review.UID = Guid.NewGuid();
        review.CreatedAt = DateTime.UtcNow;
        review.RouteName = Regex.Replace(review.Title.ToLower(), @"[^a-zA-Z0-9\s]", "").Replace(" ", "-");
        review.Author = user;

        await _context.GameReviews.AddAsync(review);
        await _context.SaveChangesAsync();
        
        return Ok(review);
    }

    [HttpDelete("delete")]
    public async Task<ActionResult> DeleteAll()
    {
        var r = await _context.GameReviews.Include(r => r.Attributes).Include(x => x.Game).ToListAsync();

        foreach(var a in r)
        {
            if(a.Attributes != null)
            {
                _context.RemoveRange(a.Attributes);
            }
            
            if(a.Game != null)
            {
                _context.Remove(a.Game);
            }
        }

        _context.RemoveRange(r);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpGet("get-info-name/{name}")]
    public async Task<ActionResult<List<Dash>>> GetInfoByName(string name)
    {
        DbGameReview? review = await _context.GameReviews
            .Include(x => x.Author)
            .Include(x => x.Game)
            .Include(r => r.Attributes)
            .FirstOrDefaultAsync(x => x.RouteName == name);
      
        if (review is null)
        {
            return BadRequest($"Review with name: {name} dose not exist");
        }

        return Ok(review);
    }

    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteReviewById(int id)
    {
        var review = await _context.GameReviews.Include(r => r.Attributes).FirstOrDefaultAsync(x => x.Id == id);

        if(review is null)
        {
            return BadRequest();
        }

        _context.RemoveRange(review.Attributes);
        _context.Remove(review);
        await _context.SaveChangesAsync();

        return Ok();
    }
}