using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using website_dulich_backend.DTOs.Auth;
using website_dulich_backend.Services;

namespace website_dulich_backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            try
            {
                await _authService.RegisterAsync(request);

                return Ok(new
                {
                    Message = "Đăng ký thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = ex.Message
                });
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(
        LoginRequest request)
        {
            var result = await _authService.LoginAsync(request);

            if (result == null)
            {
                return Unauthorized("Tên người dùng hoặc mật khẩu không hợp lệ");
            }

            return Ok(result);
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            return Ok(
                "Đã đăng nhập thành công"
            );
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var username = User.Identity?.Name;

            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            var userId =User.FindFirst("UserId")?.Value;

            return Ok(new
            {
                UserId = userId,
                Username = username,
                Role = role
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public IActionResult AdminOnly()
        {
            return Ok("Xin chào Admin");
        }


        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail(string token)
        {
            var result = await _authService.VerifyEmailAsync(token);

            if (!result)
            {
                return BadRequest("Liên kết xác thực không hợp lệ hoặc đã hết hạn.");
            }

            return Ok("Xác thực Email thành công.");
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword( ForgotPasswordRequest request)
        {
            await _authService.ForgotPasswordAsync(request);

            return Ok(new
            {
                Message = "Liên kết đặt lại mật khẩu đã được gửi tới Email của bạn."
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {
            await _authService.ResetPasswordAsync(request);

            return Ok(new
            {
                Message = "Đổi mật khẩu thành công."
            });
        }
    }
}
