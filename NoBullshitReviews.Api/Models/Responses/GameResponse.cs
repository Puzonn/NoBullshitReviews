using NoBullshitReviews.Models.Database;

namespace NoBullshitReviews.Models.Responses;

public class GameResponse
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Publisher { get; set; }
    public required string Developer {  get; set; } 
    public required string ImagePath { get; set; }  
    public required string RouteName { get; set; } 
    public required DateTime InitialRelease { get; set; }

    public static GameResponse FromGame(DbGame game)
    {
        return new GameResponse()
        {
            RouteName = game.RouteName,
            Title = game.Title,
            Description = game.Description,
            Publisher = game.Publisher,
            Developer = game.Developer,
            ImagePath = game.ImagePath,
            InitialRelease = game.InitialRelease
        };
    }
}