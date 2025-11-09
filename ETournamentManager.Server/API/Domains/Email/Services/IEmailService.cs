using Core.Common.Data.Interfaces;

namespace API.Domains.Email.Services
{
    public interface IEmailService : IService
    {
        Task SendEmail(string toEmail, string subject, string body, string filePath = null);
    }
}
