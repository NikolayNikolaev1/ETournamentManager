using MimeKit;
using System.Net.Mail;
using System.Text;

namespace API.Domains.Email.Services
{
    public class EmailService(IConfiguration configuration) : IEmailService
    {
        public async Task SendEmail(string toEmail, string subject, string body, string filePath = null)
        {
            var emailConfig = configuration.GetSection("EmailConfig");
            var email = new MailMessage(emailConfig["SenderEmail"], toEmail);

            // Set the subject
            email.Subject = subject;

            // Set the body
            var builder = new BodyBuilder { TextBody = body, BodyEncoding = Encoding.UTF8};

            // Add attachment if filePath is provided
            if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath))
            {
                builder.Attachments.Add(filePath);
            }

            email.Body = builder.ToMessageBody().ToString();

            // Send email using SMTP
            using (var smtp = new SmtpClient(emailConfig["SMTPServer"], int.Parse(emailConfig["SMTPPort"])))
            {

                // No authentication needed for local SMTP
                await smtp.SendMailAsync(email);
            }
        }
    }
}
