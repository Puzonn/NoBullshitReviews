using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models.Requests;

public class MovieCreationRequest
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; }

    [Required]
    [MaxLength(500)]
    public string Description { get; set; }

    [Required]
    [MaxLength(100)]
    public string Studio { get; set; }

    [Required]
    public DateTime InitialRelease { get; set; }

    [Required]
    public IFormFile Image { get; set; }
}
