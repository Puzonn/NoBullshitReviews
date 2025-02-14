using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoBullshitReviews.Database;
using NoBullshitReviews.Models.Database;
using NoBullshitReviews.Models.Requests;

namespace NoBullshitReviews.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{
    private readonly ReviewContext _context;
    private readonly ILogger<GameController> _logger;
    private readonly IHostEnvironment _environment;

    public GameController(ReviewContext context, ILogger<GameController> logger, IHostEnvironment environment)
    {
        _environment = environment;
        _logger = logger;
        _context = context;
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<ActionResult<DbGame>> CreateGame([FromForm] GameCreationRequest request)
    {
        DbGame game = DbGame.FromRequest(request);

        if ((await _context.Games.Where(x => x.Title == game.Title).FirstOrDefaultAsync()) != null)
        {
            return BadRequest("Game already exist with given title");
        }

        var webRootPath = Path.Combine(_environment.ContentRootPath, "wwwroot", "uploads");

        if (!Directory.Exists(webRootPath))
            Directory.CreateDirectory(webRootPath);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(request.Image.FileName);
        var filePath = Path.Combine(webRootPath, fileName);

        game.ImagePath = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";

        try
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.Image.CopyToAsync(stream);
            }
        }
        catch(Exception ex)
        {
            _logger.LogError(ex.StackTrace);
        }

        await _context.AddAsync(game);
        await _context.SaveChangesAsync();

        return Ok(game);
    }
}