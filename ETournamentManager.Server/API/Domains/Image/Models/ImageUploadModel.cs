namespace API.Domains.Image.Models
{
    public class ImageUploadModel
    {
        public string EntityId { get; set; } = string.Empty;

        public IFormFile File { get; set; } = null!;
    }
}
