using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoBullshitReviews.Migrations
{
    /// <inheritdoc />
    public partial class GameReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Reviews_ReviewId",
                table: "Attribute");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_AuthorId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews");

            migrationBuilder.RenameTable(
                name: "Reviews",
                newName: "Review");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_AuthorId",
                table: "Review",
                newName: "IX_Review_AuthorId");

            migrationBuilder.AddColumn<string>(
                name: "Developer",
                table: "Review",
                type: "TEXT",
                maxLength: 60,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Review",
                type: "TEXT",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "InitlialRelease",
                table: "Review",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Platforms",
                table: "Review",
                type: "TEXT",
                maxLength: 7,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Publisher",
                table: "Review",
                type: "TEXT",
                maxLength: 60,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Review",
                table: "Review",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Review_ReviewId",
                table: "Attribute",
                column: "ReviewId",
                principalTable: "Review",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Users_AuthorId",
                table: "Review",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Review_ReviewId",
                table: "Attribute");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_Users_AuthorId",
                table: "Review");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Review",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "Developer",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "InitlialRelease",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "Platforms",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "Publisher",
                table: "Review");

            migrationBuilder.RenameTable(
                name: "Review",
                newName: "Reviews");

            migrationBuilder.RenameIndex(
                name: "IX_Review_AuthorId",
                table: "Reviews",
                newName: "IX_Reviews_AuthorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Reviews_ReviewId",
                table: "Attribute",
                column: "ReviewId",
                principalTable: "Reviews",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_AuthorId",
                table: "Reviews",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
