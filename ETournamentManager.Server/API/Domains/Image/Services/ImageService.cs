namespace API.Domains.Image.Services
{
    using Core.Exceptions;
    using Models;

    using static Core.Common.Constants.AuthConfig;
    using static Core.Common.Constants.ErrorMessages;
    using static StatusCodes;

    public class ImageService : IImageService
    {
        private readonly ICollection<string> extensions = new HashSet<string>() { ".jpg" };
        private readonly long mbToBitesCalcluation = 5 * 1024 * 1024;
        private readonly string path = Path.Combine(Directory.GetCurrentDirectory(), STATIC_FILES_PATH);

        public async Task Upload(ImageUploadModel model)
        {
            IFormFile file = model.File;

            string fileExtension = Path.GetExtension(file.FileName);

            if (!extensions.Contains(fileExtension))
            {
                throw new BusinessServiceException(
                    INVALID_IMAGE_FILE_EXTENSION,
                    CLIENT_VALIDATION_ERROR_TITLE,
                    "file",
                    Status400BadRequest);
            }

            long size = file.Length;

            if (size > mbToBitesCalcluation)
            {
                throw new BusinessServiceException(
                    INVALID_IMAGE_FILE_SIZE,
                    CLIENT_VALIDATION_ERROR_TITLE,
                    "file",
                    Status400BadRequest);
            }

            using FileStream stream = new FileStream(@$"{path}\{model.EntityId}{fileExtension}", FileMode.Create);
            await file.CopyToAsync(stream);
        }

        public async Task Delete(string name)
        {
            File.Delete(@$"{path}\{name}.jpg");

            await Task.CompletedTask;
        }
    }
}
