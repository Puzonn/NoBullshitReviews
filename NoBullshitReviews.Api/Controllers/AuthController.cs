using Microsoft.AspNetCore.Mvc;
using NoBullshitReviews.Models;
using NoBullshitReviews.Services;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using NoBullshitReviews.Database;
using Microsoft.EntityFrameworkCore;
using NoBullshitReviews.Models.Database;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace NoBullshitReviews.Controllers;

[Controller]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly ReviewContext _context;

    public AuthController(AuthService authService, ReviewContext context)
    {
        _context = context; 
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost("authorize")]
    public async Task<ActionResult<DbUser>> Authorize([FromBody] string code)
    {
        string discordAuthToken;
        DiscordUser discordUser;

        try
        {
            discordAuthToken = await _authService.GetToken(code);
            discordUser = await _authService.GetDiscordUser(discordAuthToken);
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);  
        }

        DbUser? user = await _context.Users.Where(x => x.DiscordUserId == discordUser.DiscordId).FirstOrDefaultAsync();

        if(user is null)
        {
            user = new DbUser()
            {
                DiscordUserId = discordUser.DiscordId,
                Roles = new List<string>(),
                Username = discordUser.Username,
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();  
        }

        await HttpContext.SignInAsync(new ClaimsPrincipal(
             new ClaimsIdentity(
                 new Claim[]
                 {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                 }, CookieAuthenticationDefaults.AuthenticationScheme)
             ), new AuthenticationProperties()
             {
                 IsPersistent = true,
                 AllowRefresh = true,
                 ExpiresUtc = DateTime.UtcNow.AddMinutes(15)
             });

        return Ok(user);
    }
}