﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NoBullshitReviews.Database;

#nullable disable

namespace NoBullshitReviews.Migrations
{
    [DbContext(typeof(ReviewContext))]
    partial class ReviewContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("NoBullshitReviews.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Audience")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Audio")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Bugs")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Creation")
                        .HasColumnType("TEXT");

                    b.Property<int>("Difficulty")
                        .HasColumnType("INTEGER");

                    b.Property<int>("GameSize")
                        .HasColumnType("INTEGER");

                    b.Property<int>("GameTime")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Gameplay")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Graphics")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Requirements")
                        .HasColumnType("INTEGER");

                    b.Property<string>("RouteName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Score")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Story")
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

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("NoBullshitReviews.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

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
#pragma warning restore 612, 618
        }
    }
}
