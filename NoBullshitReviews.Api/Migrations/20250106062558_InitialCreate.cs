using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoBullshitReviews.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Creation = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UID = table.Column<Guid>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 80, nullable: false),
                    Content = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    Tags = table.Column<string>(type: "TEXT", nullable: false),
                    Score = table.Column<int>(type: "INTEGER", nullable: false),
                    Graphics = table.Column<int>(type: "INTEGER", nullable: false),
                    Gameplay = table.Column<int>(type: "INTEGER", nullable: false),
                    Audio = table.Column<int>(type: "INTEGER", nullable: false),
                    Audience = table.Column<int>(type: "INTEGER", nullable: false),
                    Requirements = table.Column<int>(type: "INTEGER", nullable: false),
                    GameSize = table.Column<int>(type: "INTEGER", nullable: false),
                    Difficulty = table.Column<int>(type: "INTEGER", nullable: false),
                    Story = table.Column<int>(type: "INTEGER", nullable: false),
                    GameTime = table.Column<int>(type: "INTEGER", nullable: false),
                    Bugs = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reviews");
        }
    }
}
