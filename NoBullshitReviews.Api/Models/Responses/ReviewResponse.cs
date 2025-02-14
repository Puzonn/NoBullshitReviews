using NoBullshitReviews.Models.Database;

namespace NoBullshitReviews.Models.Responses;

public class ReviewResponse 
{
    public required string Title { get; set; }
    public required string ImagePath { get; set; }
    public required string RouteName { get; set; }
    public required string Review { get; set; }
    public required string Summary { get; set; }
    public required string AuthorName { get; set; }
    public required int Score { get; set; }
    public required List<string> Tags { get; set; } = new List<string>();
    public required List<Attribute> Attributes { get; set; } = new List<Attribute>();
    public required DateTime CreatedAt { get; set; }

    public static ReviewResponse FromReview(DbGameReview review)
    {
        return new ReviewResponse()
        {
            Title = review.Title,
            Attributes = review.Attributes,
            AuthorName = review.Author.Username,
            CreatedAt = review.CreatedAt,
            Score = review.Score,
            Tags = review.Tags,
            ImagePath = review.ImagePath,
            Review = review.Review,
            RouteName = review.RouteName,
            Summary = review.Summary,
        };
    }
}