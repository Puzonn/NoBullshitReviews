using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using NoBullshitReviews.Models.Database;

namespace NoBullshitReviews.Database;

public class ReviewContext : DbContext
{
    public DbSet<DbGameReview> GameReviews { get; set; }
    public DbSet<DbMovieReview> MovieReviews { get; set; }
    public DbSet<DbMovie> Movies { get; set; }
    public DbSet<DbGame> Games { get; set; }
    public DbSet<DbUser> Users { get; set; }
    
    public string DbPath { get; }

    public ReviewContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "local.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.ConfigureWarnings(warnings =>
    warnings.Ignore(RelationalEventId.NonTransactionalMigrationOperationWarning));

        options.UseSqlite($"Data Source={DbPath}");
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<DbGameReview>()
            .HasOne(r => r.Author)
            .WithMany(r => r.GameReviews)
            .HasForeignKey(r => r.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<DbGameReview>()
            .HasOne(p => p.Game)
            .WithMany(p => p.Reviews)
            .HasForeignKey(p => p.GameId);

        builder.Entity<DbMovieReview>()
           .HasOne(r => r.Author)
           .WithMany(r => r.MovieReviews)
           .HasForeignKey(r => r.AuthorId)
           .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<DbMovieReview>()
            .HasOne(p => p.Movie)
            .WithMany(p => p.Reviews)
            .HasForeignKey(p => p.MovieId);
    }
}