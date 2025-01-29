using NoBullshitReviews.Models.Database;

namespace NoBullshitReviews.Models;

public class Feed
{
    public List<Review> MostRecent { get; set; } = new List<Review>();
    public List<Review> Featured { get; set; } = new List<Review>();
}