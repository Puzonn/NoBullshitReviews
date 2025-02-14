using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoBullshitReviews.Migrations
{
    /// <inheritdoc />
    public partial class GameImagePath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Platforms",
                table: "GameReviews");

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Games",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Games");

            migrationBuilder.AddColumn<string>(
                name: "Platforms",
                table: "GameReviews",
                type: "TEXT",
                maxLength: 8,
                nullable: false,
                defaultValue: "");
        }
    }
}
