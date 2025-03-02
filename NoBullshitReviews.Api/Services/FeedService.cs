using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using NoBullshitReviews.Database;
using NoBullshitReviews.Models.Feeds;
using NoBullshitReviews.Models.Responses;
using System.Collections.Generic;

namespace NoBullshitReviews.Services;

public class FeedService
{
    private readonly ReviewContext _context;
    private readonly IMemoryCache _cache;

    public FeedService(ReviewContext context, IMemoryCache cache)
    {
        _cache = cache;
        _context = context;
    }

    public async Task<Feed> GetFeed()
    {
#if DEBUG
        return await CreateFeed(10);
#endif
        const string cacheKey = "feed_cache";

        if (!_cache.TryGetValue(cacheKey, out object? feed))
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5), SlidingExpiration = TimeSpan.FromMinutes(5) };

            _cache.Set(cacheKey, await CreateFeed(10), cacheEntryOptions);
        }

        return (Feed)feed!;
    }

    public async Task<GameFeed> CreateGameFeed()
    {
        var latestGames = await _context.Games
           .OrderByDescending(x => x.CreatedAt)
           .Take(10)
           .Select(x => GameResponse.FromGame(x))
           .ToListAsync();

        var bestGames = await _context.Games
           .OrderByDescending(x => Random.Shared.NextDouble())
           .Take(5)
           .Select(x => GameResponse.FromGame(x))
           .ToListAsync();

        return new GameFeed() { Best = bestGames, Latest = latestGames };
    }

    public async Task<Feed> CreateFeed(int limit)
    {
        if(limit > 100 || limit < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(limit), limit, "Limit must be greater than 0 and less than 100.");
        }

        var latest = await _context.GameReviews
            .Include(x => x.Author)
            .Include(x => x.Game)
            .OrderByDescending(x => x.CreatedAt)
            .Take(limit)
            .ToListAsync();

        return new Feed()
        {
            Featured = latest.Take(4).Select(x => Dash.FromGameReview(x)).ToList(),
            MostRecent = latest.Take(4).Select(x => Dash.FromGameReview(x)).ToList()
        };
    }
}
