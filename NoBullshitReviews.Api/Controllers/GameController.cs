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

    public GameController(ReviewContext context)
    {
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

        await _context.AddAsync(game);
        await _context.SaveChangesAsync();

        return Ok(game);
    }
}