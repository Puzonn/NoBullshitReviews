using NoBullshitReviews.Models.Responses;

namespace NoBullshitReviews.Models.Feeds;

public class GameFeed
{
    public required List<GameResponse> Latest { get; set; } = new List<GameResponse>();
    public required List<GameResponse> Best { get; set; } = new List<GameResponse>();
}