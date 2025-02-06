﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NoBullshitReviews.Database;

#nullable disable

namespace NoBullshitReviews.Migrations
{
    [DbContext(typeof(ReviewContext))]
    [Migration("20250206141234_UserAvatarUrl")]
    partial class UserAvatarUrl
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("NoBullshitReviews.Models.Attribute", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AttributeName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("TEXT");

                    b.Property<int>("AttributeValueIndex")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ReviewId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ReviewId");

                    b.ToTable("Attribute");
                });

            modelBuilder.Entity("NoBullshitReviews.Models.Database.DbUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AvatarUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long>("DiscordUserId")
                        .HasColumnType("INTEGER");

                    b.PrimitiveCollection<string>("Roles")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("NoBullshitReviews.Models.Database.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AuthorId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Creation")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ReviewType")
                        .HasColumnType("INTEGER");

                    b.Property<string>("RouteName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Score")
                        .HasColumnType("INTEGER");

                    b.PrimitiveCollection<string>("Tags")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UID")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("NoBullshitReviews.Models.Attribute", b =>
                {
                    b.HasOne("NoBullshitReviews.Models.Database.Review", null)
                        .WithMany("Attributes")
                        .HasForeignKey("ReviewId");
                });

            modelBuilder.Entity("NoBullshitReviews.Models.Database.Review", b =>
                {
                    b.HasOne("NoBullshitReviews.Models.Database.DbUser", "Author")
                        .WithMany("Reviews")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("NoBullshitReviews.Models.Database.DbUser", b =>
                {
                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("NoBullshitReviews.Models.Database.Review", b =>
                {
                    b.Navigation("Attributes");
                });
#pragma warning restore 612, 618
        }
    }
}
