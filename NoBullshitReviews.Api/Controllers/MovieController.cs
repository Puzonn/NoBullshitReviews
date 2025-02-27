using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoBullshitReviews.Database;
using NoBullshitReviews.Models.Database;
using NoBullshitReviews.Models.Requests;

namespace NoBullshitReviews.Controllers;

[ApiController]
[Route("[controller]")]
public class MovieController : ControllerBase
{
    private readonly ReviewContext _context;
    private readonly ILogger<GameController> _logger;
    private readonly IHostEnvironment _environment;

    public MovieController(ReviewContext context, ILogger<GameController> logger, IHostEnvironment environment)
    {
        _environment = environment;
        _logger = logger;
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
    public async Task<ActionResult<DbGame>> CreateGame([FromForm] MovieCreationRequest request)
    {
        DbMovie movie = DbMovie.FromRequest(request);

        if ((await _context.Movies.Where(x => x.Title == movie.Title).FirstOrDefaultAsync()) != null)
        {
            return BadRequest("Movie already exist with given title");
        }

        var webRootPath = Path.Combine(_environment.ContentRootPath, "wwwroot", "uploads");

        if (!Directory.Exists(webRootPath))
            Directory.CreateDirectory(webRootPath);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(request.Image.FileName);
        var filePath = Path.Combine(webRootPath, fileName);

        movie.ImagePath = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";

        try
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.Image.CopyToAsync(stream);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.StackTrace);
        }

        await _context.AddAsync(movie);
        await _context.SaveChangesAsync();

        return Ok(movie);
    }
}