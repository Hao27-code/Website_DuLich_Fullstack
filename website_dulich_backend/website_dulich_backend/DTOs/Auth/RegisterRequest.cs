using System.ComponentModel.DataAnnotations;

namespace website_dulich_backend.DTOs.Auth
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Tên không được để trống")]
        [MinLength(3)]
        public string FullName { get; set; } = string.Empty;


        [Required(ErrorMessage = "Email không được để trống.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@gmail\.com$", ErrorMessage = "Email không hợp lệ.")]
        public string Email { get; set; } = string.Empty;


        [Required(ErrorMessage = "Mật khẩu không được để trống")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$",ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.")]

        public string Password { get; set; } = string.Empty;


        [Required(ErrorMessage = "Vui lòng xác nhận mật khẩu.")]
        //tự động kiểm tra xem ConfirmPassword có giống với Password hay không
        [Compare(nameof(Password), ErrorMessage = "Mật khẩu xác nhận không khớp.")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}

