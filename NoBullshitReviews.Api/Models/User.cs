using NoBullshitReviews.Models.Database;
using System.ComponentModel.DataAnnotations;

namespace NoBullshitReviews.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    public long DiscordUserId { get; set; }
    public string Username { get; set; }

    public List<string> Roles { get; set; } = new List<string>(); 
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}