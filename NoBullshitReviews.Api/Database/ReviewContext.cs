using Microsoft.EntityFrameworkCore;
using NoBullshitReviews.Models;

namespace NoBullshitReviews.Database;

public class ReviewContext : DbContext
{
    public DbSet<Review> Reviews { get; set; }

    public string DbPath { get; }

    public ReviewContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "local.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}
