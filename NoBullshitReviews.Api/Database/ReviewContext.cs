using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using NoBullshitReviews.Models;
using NoBullshitReviews.Models.Database;

namespace NoBullshitReviews.Database;

public class ReviewContext : DbContext
{
    public DbSet<Review> Reviews { get; set; }
    public DbSet<User> Users { get; set; }
    
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

#if DEBUG
        options.EnableSensitiveDataLogging();
#endif
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Review>()
    .HasOne(r => r.Author)
    .WithMany(u => u.Reviews)
    .HasForeignKey(r => r.AuthorId);
    }
}