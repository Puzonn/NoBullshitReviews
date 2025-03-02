using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoBullshitReviews.Database;
using NoBullshitReviews.Models.Database;
using NoBullshitReviews.Models.Requests;
using NoBullshitReviews.Services;

namespace NoBullshitReviews.Controllers;

[ApiController]
[Route("[controller]")]
public class MovieController : ControllerBase
{
    private readonly CDNService _cdn;
    private readonly ReviewContext _context;

    public MovieController(ReviewContext context, CDNService cdn)
    {
        _cdn = cdn;   
        _context = context;
    }

    [HttpGet("{name}")]
    public async Task<ActionResult<DbMovie?>> FetchMovie(string name)
    {
        DbMovie? movie = await _context.Movies.Where(x => x.Title == name).FirstOrDefaultAsync();

        if (movie is null)
        {
            return NotFound($"Movie with title '{name}' not found.");
        }

        return Ok(movie);
    }

    [Authorize]
    [HttpPost("create-base")]
    public async Task<ActionResult<DbGame>> CreateMovie([FromForm] MovieCreationRequest request)
    {
        DbMovie movie = DbMovie.FromRequest(request);

        if(await _context.Movies.AnyAsync(x => x.Title == request.Title))
        {
            return BadRequest("Movie already exist with given title");
        }

        try
        {
            string? path = await _cdn.CreateFile(Request, request.Image);

            if (string.IsNullOrEmpty(path))
            {
                return BadRequest("An error occurred while uploading a file.");
            }

            movie.ImagePath = path;
        }

        catch (Exception ex)
        {
            BadRequest(ex.Message);
        }

        await _context.AddAsync(movie);
        await _context.SaveChangesAsync();

        return Ok(movie);
    }
}