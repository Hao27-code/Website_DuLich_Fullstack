namespace website_dulich_backend.Services
{
    public interface IEmailService
    {
        //gửi email xác thực
        Task SendEmailAsync(string to, string subject, string body);
    }
}
