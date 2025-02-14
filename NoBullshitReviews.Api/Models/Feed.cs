using NoBullshitReviews.Models.Database;

namespace NoBullshitReviews.Models;

public class Feed
{
    public List<DbGameReview> MostRecent { get; set; } = new List<DbGameReview>();
    public List<DbGameReview> Featured { get; set; } = new List<DbGameReview>();
}