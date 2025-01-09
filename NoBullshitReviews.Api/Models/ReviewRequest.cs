namespace NoBullshitReviews.Models;

public class ReviewRequest : ReviewBase
{
    public IFormFile Image { get; set; }
}