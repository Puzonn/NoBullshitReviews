using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoBullshitReviews.Database;
using NoBullshitReviews.Models;
using NoBullshitReviews.Models.Database;
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
    private readonly ReviewService _reviewService;

    private readonly IConfiguration _configuration;
    private readonly string _staticImageDirectory;

    public ReviewController(ReviewContext context, IConfiguration configuration, ReviewService reviewService)
    {
        _reviewService = reviewService;
        _configuration = configuration;
        _context = context;

        string? staticImageDirectory = _configuration["StaticImageDirectory"];

        if(string.IsNullOrEmpty(staticImageDirectory))
        {
            throw new Exception("StaticImageDirectory is empty in configuration");
        }

        _staticImageDirectory = staticImageDirectory;
    }

    [HttpGet("query")]
    public async Task<ActionResult<ReviewResponse[]>> Query([FromQuery] string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            return BadRequest("Search query cannot be empty.");
        }

        string lowerQuery = query.ToLower();

        return Ok(await _context.GameReviews
            .Where(x => !string.IsNullOrEmpty(x.Title) && x.Title.ToLower().Contains(lowerQuery))
            .Take(5)
            .Select(x => ReviewResponse.FromReview(x))
            .ToArrayAsync());
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<ActionResult<ReviewResponse>> CreateReview([FromForm] GameReviewCreationRequest request)
    {
        var r = await _context.GameReviews.Include(x => x.Game).ToListAsync();
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

        //try
        //{
        //    if (request.Image != null && request.Image.Length > 0)
        //    {
        //        string extension = Path.GetExtension(request.Image.FileName);
        //        string path = $"{_staticImageDirectory}/{review.UID}{extension}";

        //        using (Stream stream = new FileStream(path, new FileStreamOptions() { Mode = FileMode.CreateNew, Access = FileAccess.Write }))
        //        {
        //            await request.Image.CopyToAsync(stream);
        //        }

        //        review.ImagePath = $"{review.UID}{extension}";
        //    }
        //}
        //catch (Exception)
        //{
        //    return Problem("Error while saving image", statusCode: 500);
        //}

        await _context.GameReviews.AddAsync(review);
        await _context.SaveChangesAsync();
         
        ReviewResponse response = ReviewResponse.FromReview(review);

        return Ok(response);
    }

    [HttpGet("feed")]
    public async Task<ActionResult<Feed>> GetFeed()
    {
        return Ok(await _reviewService.GetFeed());
    }

    [HttpDelete("delete")]
    public async Task<ActionResult> DeleteAll()
    {
        var r = await _context.GameReviews.Include(r => r.Attributes).ToListAsync();

        foreach(var a in r)
        {
            if(a.Attributes != null)
            {
                _context.RemoveRange(a.Attributes);
            }
        }

        _context.RemoveRange(r);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpGet("get-info-name/{name}")]
    public async Task<ActionResult<List<ReviewResponse>>> GetInfoByName(string name)
    {
        DbGameReview? review = await _context.GameReviews
            .Include(x => x.Author)
            .Include(x => x.Game)
            .Include(r => r.Attributes)
            .FirstOrDefaultAsync(x => x.RouteName == name);
 
        var principal = HttpContext.User;
        DbUser? user = null;

        if (principal?.Identity?.IsAuthenticated ?? false)
        {
            var id = principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            if (id is null)
            {
                return Unauthorized();
            }

            user = await _context.Users.FindAsync(int.Parse(id));
        }

        if (review is null)
        {
            return BadRequest($"Review with name: {name} dose not exist");
        }

        return Ok(ReviewResponse.FromReview(review));
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