using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models.Database;

public class DbMovieReview
{
    [Key]
    public int Id { get; set; }

    public DbUser Author { get; set; }
    public int AuthorId { get; set; }

    public DbMovie Movie { get; set; }
    public int MovieId { get; set; }
}