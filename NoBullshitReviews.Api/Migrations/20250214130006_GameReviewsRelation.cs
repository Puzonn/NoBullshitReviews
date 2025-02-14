using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoBullshitReviews.Migrations
{
    /// <inheritdoc />
    public partial class GameReviewsRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GameId",
                table: "GameReviews",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GameReviews_GameId",
                table: "GameReviews",
                column: "GameId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameReviews_Games_GameId",
                table: "GameReviews",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameReviews_Games_GameId",
                table: "GameReviews");

            migrationBuilder.DropIndex(
                name: "IX_GameReviews_GameId",
                table: "GameReviews");

            migrationBuilder.DropColumn(
                name: "GameId",
                table: "GameReviews");
        }
    }
}
