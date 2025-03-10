﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NoBullshitReviews.Models.Database;

public class DbUser
{
    [Key]
    [JsonIgnore]
    public int Id { get; set; }

    [JsonIgnore]
    public long DiscordUserId { get; set; }
    public string Username { get; set; }
    public string AvatarUrl { get; set; } = string.Empty;

    [JsonIgnore]
    public List<string> Roles { get; set; } = new List<string>();

    /* TODO: Throws when review include author */
    [JsonIgnore]
    public ICollection<DbGameReview> GameReviews { get; set; } = new List<DbGameReview>();

    [JsonIgnore]
    public ICollection<DbMovieReview> MovieReviews { get; set; } = new List<DbMovieReview>();
}