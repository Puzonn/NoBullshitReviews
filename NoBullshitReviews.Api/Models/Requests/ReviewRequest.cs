using NoBullshitReviews.Enums;
using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models.Requests;

public class ReviewRequest
{
    [Required]
    [MaxLength(80)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string Summary { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string Review { get; set; } = string.Empty;

    [Required]
    [Range(0, 100)]
    public int Score { get; set; }

    [Required]
    public Dictionary<string, int> Attributes { get; set; } = new();

    [Required]
    public List<string> Tags { get; set; } = new();

    [Required]
    public ContentType ReviewType { get; set; }

    [Required]
    public IFormFile Image { get; set; }
}