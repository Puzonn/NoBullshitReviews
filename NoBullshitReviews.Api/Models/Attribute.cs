using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NoBullshitReviews.Models;

public class Attribute
{
    [JsonIgnore]
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string AttributeName { get; set; } = string.Empty;

    [Required]
    [Range(0, 6)]
    public int AttributeValueIndex { get; set; }
}