using NoBullshitReviews.Models.Database;
using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models.Responses;

public class ReviewResponse : ReviewBase
{
    [Required]
    public DateTime Creation { get; set; }

    [Required]
    public string AuthorName { get; set; } = string.Empty;

    [Required]
    public string ImagePath { get; set; } = string.Empty;

    [Required]
    public string RouteName { get; set; } = string.Empty;

    [Required]
    public bool IsAuthor { get; set; } = false;

    public static ReviewResponse FromReview(Review review)
    {
        return new ReviewResponse()
        {
            Difficulty = review.Difficulty,
            Audience = review.Audience, 
            Audio = review.Audio,
            Bugs = review.Bugs,
            Content = review.Content,   
            Gameplay = review.Gameplay,
            GameSize = review.GameSize,
            GameTime = review.GameTime,
            Graphics = review.Graphics,
            Requirements = review.Requirements,
            ImagePath = review.ImagePath,
            Creation = review.Creation,
            Title = review.Title,
            Tags = review.Tags,
            Story = review.Story,
            RouteName = review.RouteName,
            Score = review.Score,
        };   
    }
}