using System.Diagnostics;

namespace NoBullshitReviews.Services;

public class CDNService
{
    private readonly IHostEnvironment _environment;
    private readonly ILogger<CDNService> _logger;

    public CDNService(IHostEnvironment environment, ILogger<CDNService> logger)
    {
        _logger = logger;
        _environment = environment;
    }

    /// <summary>
    /// Adds file to CDN and returns path
    /// </summary>
    public async Task<string?> CreateFile(HttpRequest request, IFormFile file)
    {
        if (file is null)
        {
            throw new ArgumentNullException(nameof(file));
        }

        if (file.Length == 0)
        {
            throw new ArgumentException(nameof(file));
        }

        var webRootPath = Path.Combine(_environment.ContentRootPath, "wwwroot", "uploads");

        if (!Directory.Exists(webRootPath))
            Directory.CreateDirectory(webRootPath);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(webRootPath, fileName);

        string cdn =  $"{request.Scheme}://{request.Host}/uploads/{fileName}";

        try
        {
            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while uploading a file.");
        }

        return cdn;
    }
}