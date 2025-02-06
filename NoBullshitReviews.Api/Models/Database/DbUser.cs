using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NoBullshitReviews.Models.Database;

public class DbUser
{
    [Key]
    public int Id { get; set; }

    public long DiscordUserId { get; set; }
    public string Username { get; set; }
    public string AvatarUrl { get; set; } = string.Empty;

    public List<string> Roles { get; set; } = new List<string>();

    /* TODO: Throws when review include author */
    [JsonIgnore]
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}