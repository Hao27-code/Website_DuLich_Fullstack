using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using website_dulich_backend.Models;

namespace website_dulich_backend.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAdminAsync(AppDbContext context)
        {
            // Nếu đã có Admin thì không tạo nữa
            if (await context.Users.AnyAsync(x => x.Role.ToLower() == "admin"))
            {
                return;
            }

            var admin = new User
            {
                FullName = "AnhHao",
                Email = "ngocanhhao458@gmail.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                Role = "Admin",
                // Admin mặc định đã xác thực email
                EmailConfirmed = true,

                // Không cần token xác thực
                EmailVerificationToken = null,
                EmailVerificationTokenExpiry = null,

                // Chưa yêu cầu reset mật khẩu
                PasswordResetToken = null,
                PasswordResetTokenExpiry = null,

                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Users.Add(admin);

            await context.SaveChangesAsync();
        }
    }
}