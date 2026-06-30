namespace website_dulich_backend.DTOs.Auth
{
    public class RegisterResponse
    {
        //trả kết quả dạng Json
        public Guid UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
