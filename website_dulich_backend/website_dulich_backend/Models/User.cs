namespace website_dulich_backend.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty; 
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } ="User";
        public bool EmailConfirmed { get; set; }

        //mã dùng để xác thực email
        public string? EmailVerificationToken { get; set; }
        //Link hết hạn khi quá thời gian xác thực email
        public DateTime? EmailVerificationTokenExpiry { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string? PasswordResetToken { get; set; }
        public DateTime? PasswordResetTokenExpiry { get; set; }
    }
}
