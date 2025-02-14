using NoBullshitReviews.Models.Responses;

namespace NoBullshitReviews.Models;

public class Feed
{
    public List<ReviewResponse> MostRecent { get; set; } = new List<ReviewResponse>();
    public List<ReviewResponse> Featured { get; set; } = new List<ReviewResponse>();
}