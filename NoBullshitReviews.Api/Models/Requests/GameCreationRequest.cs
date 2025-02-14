using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models.Requests;

public class GameCreationRequest
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; }

    [Required]
    [MaxLength(500)]
    public string Description { get; set; }

    [Required]
    [MaxLength(100)]
    public string Publisher { get; set; }

    [Required]
    [MaxLength(100)]
    public string Developer { get; set; }

    [Required]
    public DateTime InitialRelease { get; set; }

    [Required]
    public IFormFile Image { get; set; }
}