using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoBullshitReviews.Migrations
{
    /// <inheritdoc />
    public partial class MovieImagePath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DbMovieReview_DbMovie_MovieId",
                table: "DbMovieReview");

            migrationBuilder.DropForeignKey(
                name: "FK_DbMovieReview_Users_AuthorId",
                table: "DbMovieReview");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DbMovieReview",
                table: "DbMovieReview");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DbMovie",
                table: "DbMovie");

            migrationBuilder.RenameTable(
                name: "DbMovieReview",
                newName: "MovieReviews");

            migrationBuilder.RenameTable(
                name: "DbMovie",
                newName: "Movies");

            migrationBuilder.RenameIndex(
                name: "IX_DbMovieReview_MovieId",
                table: "MovieReviews",
                newName: "IX_MovieReviews_MovieId");

            migrationBuilder.RenameIndex(
                name: "IX_DbMovieReview_AuthorId",
                table: "MovieReviews",
                newName: "IX_MovieReviews_AuthorId");

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Movies",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieReviews",
                table: "MovieReviews",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Movies",
                table: "Movies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieReviews_Movies_MovieId",
                table: "MovieReviews",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieReviews_Users_AuthorId",
                table: "MovieReviews",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieReviews_Movies_MovieId",
                table: "MovieReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieReviews_Users_AuthorId",
                table: "MovieReviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Movies",
                table: "Movies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieReviews",
                table: "MovieReviews");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Movies");

            migrationBuilder.RenameTable(
                name: "Movies",
                newName: "DbMovie");

            migrationBuilder.RenameTable(
                name: "MovieReviews",
                newName: "DbMovieReview");

            migrationBuilder.RenameIndex(
                name: "IX_MovieReviews_MovieId",
                table: "DbMovieReview",
                newName: "IX_DbMovieReview_MovieId");

            migrationBuilder.RenameIndex(
                name: "IX_MovieReviews_AuthorId",
                table: "DbMovieReview",
                newName: "IX_DbMovieReview_AuthorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DbMovie",
                table: "DbMovie",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DbMovieReview",
                table: "DbMovieReview",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DbMovieReview_DbMovie_MovieId",
                table: "DbMovieReview",
                column: "MovieId",
                principalTable: "DbMovie",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DbMovieReview_Users_AuthorId",
                table: "DbMovieReview",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
