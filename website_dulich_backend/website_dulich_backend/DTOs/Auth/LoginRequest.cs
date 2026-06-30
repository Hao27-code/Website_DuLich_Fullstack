using System.ComponentModel.DataAnnotations;

namespace website_dulich_backend.DTOs.Auth
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Email không được để trống")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password không được để trống")]
        public string Password { get; set; } = string.Empty;
    }
}
