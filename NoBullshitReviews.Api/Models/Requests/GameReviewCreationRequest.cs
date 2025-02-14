using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models.Requests;

public class GameReviewCreationRequest
{
    [Required]
    [MaxLength(100)]
    public string GameTitle { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; }

    [Required]
    [MaxLength(500)]
    public string Summary { get; set; }

    [Required]
    [MaxLength(500)]
    public string Review { get; set; }

    [Required]
    [Range(0, 100)]
    public int Score { get; set; }

    [Required]
    public List<string> SearchTags = new List<string>();

    [Required]
    public Dictionary<string, int> Attributes { get; set; } = new();
}