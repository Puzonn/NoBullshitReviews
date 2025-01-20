using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoBullshitReviews.Database;
using NoBullshitReviews.Models.Database;
using NoBullshitReviews.Models.Requests;
using NoBullshitReviews.Models.Responses;
using System.Security.Claims;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace NoBullshitReviews.Controllers;

[ApiController]
[Route("[controller]")]
public class ReviewController : ControllerBase
{
    private readonly ReviewContext _context;
    private readonly IConfiguration _configuration;
    private readonly string _staticImageDirectory;

    public ReviewController(ReviewContext context, IConfiguration configuration)
    {
        _configuration = configuration;
        _context = context;

        string? staticImageDirectory = _configuration["StaticImageDirectory"];

        if(string.IsNullOrEmpty(staticImageDirectory))
        {
            throw new Exception("StaticImageDirectory is empty in configuration");
        }

        _staticImageDirectory = staticImageDirectory;
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<ActionResult<Review>> CreateReview([FromForm] ReviewRequest request)
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

        Review review = Review.FromRequest(request);

        review.UID = Guid.NewGuid();
        review.Creation = DateTime.UtcNow;
        review.RouteName = Regex.Replace(review.Title.ToLower(), @"[^a-zA-Z0-9\s]", "").Replace(" ", "-");
        review.Author = user;

        try
        {
            if (request.Image != null && request.Image.Length > 0)
            {
                string extension = Path.GetExtension(request.Image.FileName);
                string path = $"{_staticImageDirectory}/{review.UID}{extension}";

                using (Stream stream = new FileStream(path, new FileStreamOptions() { Mode = FileMode.CreateNew, Access = FileAccess.Write }))
                {
                    await request.Image.CopyToAsync(stream);
                }

                review.ImagePath = $"{review.UID}{extension}";
            }
        }
        catch(Exception)
        {
            return Problem("Error while saving image", statusCode: 500);
        }

        await _context.Reviews.AddAsync(review);
        await _context.SaveChangesAsync();

        ReviewResponse response = ReviewResponse.FromReview(review);
        response.AuthorName = user.Username;

        return Ok(JsonSerializer.Serialize(response));
    }

    [Authorize]
    [HttpGet("get-all")]
    public async Task<ActionResult<List<ReviewRequest>>> GetAll()
    {
        var reviews = _context.Reviews.Take(10);
        return Ok(JsonSerializer.Serialize(reviews));
    }

    [HttpGet("get-info-name/{name}")]
    public async Task<ActionResult<List<ReviewRequest>>> GetInfoByName(string name)
    {
        Review? review = await _context.Reviews.Where(review => review.RouteName == name).FirstOrDefaultAsync();

        if(review is null)
        {
            return BadRequest($"Review with name: {name} dose not exist");
        }

        return Ok(JsonSerializer.Serialize(review));
    }

    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteReviewById(int id)
    {
        var review = await _context.Reviews.FindAsync(id);

        if(review is null)
        {
            return BadRequest();
        }

        _context.Remove(review);
        await _context.SaveChangesAsync();

        return Ok();
    }
}