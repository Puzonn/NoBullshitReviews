using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using NoBullshitReviews.Database;
using NoBullshitReviews.Models.Responses;

namespace NoBullshitReviews.Services;

public class ReviewService
{
    private readonly ReviewContext _context;
    private readonly IMemoryCache _cache;

    public ReviewService(ReviewContext context, IMemoryCache cache)
    {
        _cache = cache;
        _context = context;
    }

    public async Task<IEnumerable<ReviewResponse>> GetFeed()
    {
#if DEBUG
        return await CreateFeed(10);
#endif
        const string cacheKey = "feed_cache";

        if (!_cache.TryGetValue(cacheKey, out object? feed))
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5),
                SlidingExpiration = TimeSpan.FromMinutes(5)
            };

            _cache.Set(cacheKey, await CreateFeed(10), cacheEntryOptions);
        }

        return (IEnumerable<ReviewResponse>)feed!;
    }

    public async Task<IEnumerable<ReviewResponse>> CreateFeed(int limit)
    {
        if(limit > 100 || limit < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(limit), limit, "Limit must be greater than 0 and less than 100.");
        }

        var latest = await _context.Reviews
            .Include(x => x.Author)
            .OrderByDescending(x => x.Creation)
            .Take(limit)
            .ToListAsync();

        return latest.Select(x =>
        {
            var review = ReviewResponse.FromReview(x);
            review.AuthorName = x.Author.Username;
            return review;
        });
    }
}
