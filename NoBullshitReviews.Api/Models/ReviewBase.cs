using NoBullshitReviews.Enums;
using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models;

public class ReviewBase
{
    [Required]
    [MaxLength(80)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string Content { get; set; } = string.Empty;

    [Required]
    [Range(0, 100)]
    public int Score { get; set; }

    [Required]
    public List<string> Tags { get; set; } = new List<string>();

    [Required]
    public ReviewType ReviewType { get; set; }  

    [Required]
    public List<Attribute> Attributes { get; set; } = new List<Attribute>();
}