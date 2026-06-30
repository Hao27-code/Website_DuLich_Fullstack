using website_dulich_backend.DTOs.Auth;
using website_dulich_backend.Models;
using website_dulich_backend.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace website_dulich_backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public AuthService(IUserRepository userRepository, IConfiguration configuration, IEmailService emailService)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _emailService = emailService;
        }

        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.FullName ),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("UserId", user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {


            //kiểm tra email đã tồn tại chưa
            var emailExists = await _userRepository.GetByEmailAsync(request.Email);
            if(emailExists != null)
            {
                throw new Exception("Email đã được sử dụng");
            }
            // Sinh token xác thực email
            var token = Guid.NewGuid().ToString();

            //tạo user mới
            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password), //mã hóa password
                Role = "User",//mặc định role là User
                EmailConfirmed = false,

                EmailVerificationToken = token,
                EmailVerificationTokenExpiry = DateTime.UtcNow.AddHours(24),

                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await _userRepository.AddAsync(user);

            // Cập nhật lại user
            await _userRepository.UpdateAsync(user);
            // Tạo link xác thực Email
            var verifyLink =$"https://localhost:7040/api/Auth/verify-email?token={token}";

            // Nội dung Email
            string body = $@"
                <h2>Xác thực Email</h2>

                <p>Xin chào <b>{user.FullName}</b>,</p>

                <p>Cảm ơn bạn đã đăng ký Website Du Lịch.</p>

                <p>Vui lòng nhấn nút bên dưới để xác thực Email.</p>

                <a href='{verifyLink}'
                style='
                background:#0d6efd;
                padding:10px 18px;
                color:white;
                text-decoration:none;
                border-radius:5px;'>
                Xác thực Email
                </a>

                <p>Liên kết sẽ hết hạn sau 24 giờ.</p>";

            try
            {
                await _emailService.SendEmailAsync(user.Email!, "Xác thực Email",body);
            }
            catch
            {
                throw new Exception("Không thể gửi Email xác thực.");
            }

            //trả kết quả
            return new RegisterResponse
            {
                UserId = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                Message = "Đăng ký thành công"
            };
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return null;
            }
            if (!user.EmailConfirmed)
            {
                throw new Exception("Tài khoản chưa được xác thực Email.");
            }
            //so sánh password nhập vào với password đã lưu (đã mã hóa)
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return null;
            }

            var token = GenerateToken(user);

            return new LoginResponse
            {
                Token = token,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role
            };
        }

        public async Task<bool> VerifyEmailAsync(string token)
        {
            var user = await _userRepository.GetByVerificationTokenAsync(token);

            if (user == null)
            {
                return false;
            }

            if (user.EmailVerificationTokenExpiry == null || user.EmailVerificationTokenExpiry < DateTime.UtcNow)
            {
                return false;
            }

            user.EmailConfirmed = true;
            user.EmailVerificationToken = null;
            user.EmailVerificationTokenExpiry = null;

            await _userRepository.UpdateAsync(user);

            return true;
        }

        public async Task ForgotPasswordAsync(ForgotPasswordRequest request)
        {
            //tìm user theo email
            var user = await _userRepository.GetByEmailAsync(request.Email);

            //không thông báo email tồn tại hay không để tránh lộ thông tin người dùng
            if (user == null)
            {
                return;
            }

            //kiểm tra email đã được xác thực chưa, xác thực rồi mới được reset password
            if (!user.EmailConfirmed)
            {
                throw new Exception("Tài khoản chưa được xác thực Email.");
            }

            //sinh token reset password
            var token = Guid.NewGuid().ToString();

            user.PasswordResetToken = token;
            user.PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1);

            await _userRepository.UpdateAsync(user);

            //tạo link reset password
            var resetLink =$"http://localhost:4200/reset-password?token={token}";

               string body = $@"
                <h2>Đặt lại mật khẩu</h2>

                <p>Xin chào <b>{user.FullName}</b>,</p>

                <p>Bạn vừa yêu cầu đặt lại mật khẩu.</p>

                <a href='{resetLink}'
                style='
                background:#dc3545;
                padding:10px 18px;
                color:white;
                text-decoration:none;
                border-radius:5px;'>
                Đặt lại mật khẩu
                </a>

                <p>Liên kết sẽ hết hạn sau 1 giờ.</p>";

            await _emailService.SendEmailAsync(user.Email!,"Đặt lại mật khẩu", body);
        }

        public async Task ResetPasswordAsync(ResetPasswordRequest request)
        {
            var user = await _userRepository.GetByResetTokenAsync(request.Token);

            if (user == null)
            {
                throw new Exception("Token không hợp lệ.");
            }

            if (user.PasswordResetTokenExpiry == null ||
                user.PasswordResetTokenExpiry < DateTime.UtcNow)
            {
                throw new Exception("Token đã hết hạn.");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            user.PasswordResetToken = null;
            user.PasswordResetTokenExpiry = null;
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepository.UpdateAsync(user);
        }
    } 
}
