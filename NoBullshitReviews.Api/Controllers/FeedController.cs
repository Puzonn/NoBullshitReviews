using Microsoft.AspNetCore.Mvc;
using NoBullshitReviews.Models.Feeds;
using NoBullshitReviews.Services;

namespace NoBullshitReviews.Controllers;

[Controller]
[Route("feed")]
public class FeedController : ControllerBase
{
    private readonly FeedService _feedService;

    public FeedController(FeedService feedService)
    {
        _feedService = feedService;
    }

    [HttpGet("games")]
    public async Task<ActionResult<GameFeed>> GetGamesFeed()
    {
        return Ok(await _feedService.CreateGameFeed());
    }

    [HttpGet()]
    public async Task<ActionResult<Feed>> GetFeed()
    {
        return Ok(await _feedService.GetFeed());
    }
}