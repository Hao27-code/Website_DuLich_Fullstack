using website_dulich_backend.DTOs.Auth;


namespace website_dulich_backend.Services
{
    //xử lý nghiệp vụ: kiểm tra username, kiểm tra password, to token,...
    public interface IAuthService
    {
        //trả luôn dữ liệu cho controller
        Task<RegisterResponse> RegisterAsync(RegisterRequest request);
        Task<LoginResponse?> LoginAsync(LoginRequest request);

        Task<bool> VerifyEmailAsync(string token);

        Task ForgotPasswordAsync(ForgotPasswordRequest request);
        Task ResetPasswordAsync(ResetPasswordRequest request);
    }
}
