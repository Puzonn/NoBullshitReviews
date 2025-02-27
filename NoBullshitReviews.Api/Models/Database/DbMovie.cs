using NoBullshitReviews.Models.Requests;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NoBullshitReviews.Models.Database;

public class DbMovie
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public string ImagePath { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string Studio { get; set; }

    [Required]
    public DateTime InitialRelease { get; set; }

    [JsonIgnore]
    public List<DbMovieReview> Reviews { get; set; } = new List<DbMovieReview>();

    public static DbMovie FromRequest(MovieCreationRequest request)
    {
        return new DbMovie()
        {
            Description = request.Description,
            InitialRelease = request.InitialRelease,
            Title = request.Title,
            Studio = request.Studio,
        };
    }
}