using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoBullshitReviews.Migrations
{
    /// <inheritdoc />
    public partial class CreatedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Review_ReviewId",
                table: "Attribute");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.RenameColumn(
                name: "ReviewId",
                table: "Attribute",
                newName: "DbGameReviewId");

            migrationBuilder.RenameIndex(
                name: "IX_Attribute_ReviewId",
                table: "Attribute",
                newName: "IX_Attribute_DbGameReviewId");

            migrationBuilder.CreateTable(
                name: "GameReviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Platforms = table.Column<string>(type: "TEXT", maxLength: 8, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UID = table.Column<Guid>(type: "TEXT", nullable: false),
                    ImagePath = table.Column<string>(type: "TEXT", nullable: false),
                    RouteName = table.Column<string>(type: "TEXT", nullable: false),
                    AuthorId = table.Column<int>(type: "INTEGER", nullable: false),
                    Review = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    Summary = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    Score = table.Column<int>(type: "INTEGER", nullable: false),
                    Tags = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameReviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GameReviews_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameReviews_AuthorId",
                table: "GameReviews",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_GameReviews_DbGameReviewId",
                table: "Attribute",
                column: "DbGameReviewId",
                principalTable: "GameReviews",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_GameReviews_DbGameReviewId",
                table: "Attribute");

            migrationBuilder.DropTable(
                name: "GameReviews");

            migrationBuilder.RenameColumn(
                name: "DbGameReviewId",
                table: "Attribute",
                newName: "ReviewId");

            migrationBuilder.RenameIndex(
                name: "IX_Attribute_DbGameReviewId",
                table: "Attribute",
                newName: "IX_Attribute_ReviewId");

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AuthorId = table.Column<int>(type: "INTEGER", nullable: false),
                    Creation = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Discriminator = table.Column<string>(type: "TEXT", maxLength: 13, nullable: false),
                    ImagePath = table.Column<string>(type: "TEXT", nullable: false),
                    Review = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    ReviewType = table.Column<int>(type: "INTEGER", nullable: false),
                    RouteName = table.Column<string>(type: "TEXT", nullable: false),
                    Score = table.Column<int>(type: "INTEGER", nullable: false),
                    Summary = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    Tags = table.Column<string>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 80, nullable: false),
                    UID = table.Column<Guid>(type: "TEXT", nullable: false),
                    Developer = table.Column<string>(type: "TEXT", maxLength: 60, nullable: true),
                    InitlialRelease = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Platforms = table.Column<string>(type: "TEXT", maxLength: 7, nullable: true),
                    Publisher = table.Column<string>(type: "TEXT", maxLength: 60, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Review_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Review_AuthorId",
                table: "Review",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Review_ReviewId",
                table: "Attribute",
                column: "ReviewId",
                principalTable: "Review",
                principalColumn: "Id");
        }
    }
}
