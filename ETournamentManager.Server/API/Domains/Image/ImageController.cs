namespace API.Domains.Image
{
    using Core.Extensions;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ImageController(IImageService imageService) : ControllerBase
    {
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload(ImageUploadModel model)
            => await imageService.Upload(model).ReturnOkResult();

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
            => await imageService.Delete(id).ReturnOkResult();
    }
}
