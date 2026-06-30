using System.Net;
using System.Net.Mail;

namespace website_dulich_backend.Services
{
    //đọc cấu hình SMTP từ appsettings.json và gửi email bằng SmtpClient
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var smtpClient = new SmtpClient(_configuration["Email:Host"]!)
            {
                Port = int.Parse(_configuration["Email:Port"]!),
                Credentials = new NetworkCredential(
                    _configuration["Email:Username"]!,
                    _configuration["Email:Password"]!
                ),
                EnableSsl = true
            };
            var mail=new MailMessage
            {
                From = new MailAddress(_configuration["Email:From"]!),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mail.To.Add(to);
            await smtpClient.SendMailAsync(mail);
        }
    }
}
