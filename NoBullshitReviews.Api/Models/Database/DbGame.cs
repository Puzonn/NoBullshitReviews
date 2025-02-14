using NoBullshitReviews.Models.Requests;
using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models.Database;

public class DbGame
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public DateTime InitialRelease { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string Publisher { get; set; }

    [Required]
    public string Developer { get; set; }

    public List<DbGameReview> Reviews { get; set; } = new List<DbGameReview>();

    public static DbGame FromRequest(GameCreationRequest request)
    {
        return new DbGame()
        {
            Description = request.Description,
            Developer = request.Developer,
            InitialRelease = request.InitialRelease,
            Publisher = request.Publisher,
            Title = request.Title,
        };
    }
}