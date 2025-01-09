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
    public List<string> Tags { get; set; } = new List<string>();

    [Required]
    public int Score { get; set; }

    [Required]
    public int Graphics { get; set; }

    [Required]
    public int Gameplay { get; set; }

    [Required]
    public int Audio { get; set; }

    [Required]
    public int Audience { get; set; }

    [Required]
    public int Requirements { get; set; }

    [Required]
    public int GameSize { get; set; }

    [Required]
    public int Difficulty { get; set; }

    [Required]
    public int Story { get; set; }

    [Required]
    public int GameTime { get; set; }

    [Required]
    public int Bugs { get; set; }
}