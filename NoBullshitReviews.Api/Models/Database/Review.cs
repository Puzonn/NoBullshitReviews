using NoBullshitReviews.Models.Requests;
using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models.Database;

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

    public int AuthorId { get; set; }
    public DbUser Author { get; set; }

    [Key]
    public int Id { get; set; }

    public static Review FromRequest(ReviewRequest request)
    {
        var mappedAttributes = request.Attributes.Select(e => new Attribute()
        {
            AttributeName = e.Key,
            AttributeValueIndex = e.Value
        }).ToList();

        return new Review()
        {
            ReviewType = request.ReviewType,
            Tags = request.Tags,
            Title = request.Title,
            Summary = request.Summary,
            Review = request.Review,
            Attributes = mappedAttributes,
            Score = request.Score,
        };
    }
}