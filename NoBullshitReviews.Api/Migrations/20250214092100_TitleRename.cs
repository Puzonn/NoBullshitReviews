using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoBullshitReviews.Migrations
{
    /// <inheritdoc />
    public partial class TitleRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Games",
                newName: "Title");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Games",
                newName: "Name");
        }
    }
}
