using NoBullshitReviews.Models.Responses;

namespace NoBullshitReviews.Models.Feeds;

public class Feed
{
    public required List<Dash> MostRecent { get; set; } = new List<Dash>();
    public required List<Dash> Featured { get; set; } = new List<Dash>();
}