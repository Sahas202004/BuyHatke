using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.DTOS;
using Services.ServiceContract;

namespace OnlineShoppingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new
            {
                Message = "User Registered Successfully"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);
            if (result == null)
            {
                return Unauthorized(new
                {
                    Message = "Invalid Email Or Password"
                });
            }

            return Ok(result);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new
            {
                Message = "Logged out successfully."
            });
        }
    }
}
