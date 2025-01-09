using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models;

public class Review : ReviewBase
{
    [Required]
    public DateTime Creation { get; set; }

    [Required]
    public Guid UID { get; set; }

    [Required]
    public string ImagePath { get; set; } = string.Empty;

    [Required]
    public string RouteName { get; set; } = string.Empty;

    [Key]
    public int Id { get; set; }

    public static Review FromRequest(ReviewRequest request)
    {
        return new Review()
        {
            Title = request.Title,
            Content = request.Content,
            Difficulty = request.Difficulty,
            Audience = request.Audience,
            Audio = request.Audio,
            Bugs = request.Bugs,
            Tags = request.Tags,
            Gameplay = request.Gameplay,
            GameSize = request.GameSize,
            GameTime = request.GameTime,
            Graphics = request.Graphics,
            Requirements = request.Requirements,
            Score = request.Score,
            Story = request.Story,
        };
    }
}