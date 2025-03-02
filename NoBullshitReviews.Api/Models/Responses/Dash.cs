using NoBullshitReviews.Enums;
using NoBullshitReviews.Models.Database;

namespace NoBullshitReviews.Models.Responses;

public class Dash 
{
    public required string Title { get; set; }
    public required string ImagePath { get; set; }
    public required string RouteName { get; set; }
    public required ContentType ContentType { get; set; } 
    public required int Score { get; set; }

    public static Dash FromGameReview(DbGameReview review)
    {
        if(review.Game is null)
        {
            throw new ArgumentNullException(nameof(review.Game), "Review had null Game");
        }

        return new Dash()
        {
            ContentType = ContentType.Game,
            Title = review.Title,
            Score = review.Score,
            ImagePath = review.Game.ImagePath,
            RouteName = review.RouteName,
        };
    }
}