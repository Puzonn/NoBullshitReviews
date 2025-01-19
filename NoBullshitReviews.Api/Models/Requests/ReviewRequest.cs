
namespace NoBullshitReviews.Models.Requests;

public class ReviewRequest : ReviewBase
{
    public IFormFile Image { get; set; }
}