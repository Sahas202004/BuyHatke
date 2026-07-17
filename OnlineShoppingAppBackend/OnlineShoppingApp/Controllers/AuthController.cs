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
        public AuthController() { }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            /*
              First I Checked The Model State
              Is Model Valid,i.e. Does Model Staisfies all the Constraints
              that are applied on it.
            */
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            /*
              The AuthService is Called Once The Model Validation is Carried Out
              Successfully.
              The Result Which of _authService.RegisterAsync() is Stored in result 
              variable
            */
            var result = await _authService.RegisterAsync(registerDto);

            /*
               RegisterAsync() method returns boolean value (true/false),
               we check ,if the value is false then we return 
               a BadRequest Response with the Errors received in 
               result
             */
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            /*
                If _authService.RegisterAsync() returns true then we send
                Ok(200 status code) and a message as a Response
             */
            return Ok(new
            {
                Message = "User Registered Successfully"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.LoginAsync(loginDto);
            if (result == null)
            {
                return Unauthorized(new ErrorResponseDto
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

        public string TestingMethod()
        {
            return "Hello From Auth Controller";
        }
    }
}
