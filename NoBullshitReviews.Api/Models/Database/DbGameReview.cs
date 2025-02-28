using NoBullshitReviews.Models.Requests;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NoBullshitReviews.Models.Database;

public class DbGameReview    
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public DateTime CreatedAt { get; set; }

    [Required]
    public Guid UID { get; set; }

    [Required]
    public string ImagePath { get; set; } = string.Empty;

    [Required]
    public string RouteName { get; set; } = string.Empty;

    [JsonIgnore]
    public int AuthorId { get; set; }
    public DbUser Author { get; set; }

    [Required]
    [MaxLength(500)]
    public string Review { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string Summary { get; set; } = string.Empty;

    [Required]
    [Range(0, 100)]
    public int Score { get; set; }

    [Required]
    public List<string> Tags { get; set; } = new List<string>();

    [Required]
    public List<Attribute> Attributes { get; set; } = new List<Attribute>();

    public DbGame Game { get; set; }

    [JsonIgnore]
    public int GameId { get; set; }

    public static DbGameReview FromRequest(GameReviewCreationRequest request)
    {
        return new DbGameReview()
        {
            Attributes = request.Attributes.Select(e => new Attribute() { AttributeName = e.Key, AttributeValueIndex = e.Value }).ToList(),
            Title = request.Title,
            Tags = request.SearchTags,
            Summary = request.Summary,
            Score = request.Score,
            Review = request.Review,
        };
    }
}