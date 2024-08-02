namespace API.Domains.Image.Services
{
    using Core.Common.Data.Interfaces;
    using Models;

    public interface IImageService : IService
    {
        Task Upload(ImageUploadModel model);

        Task Delete(string name);
    }
}
