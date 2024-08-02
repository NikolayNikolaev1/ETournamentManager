namespace API.Domains.Image
{
    using Core.Extensions;
    using Microsoft.AspNetCore.Mvc;
    using Models;

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ImageController : ControllerBase
    {

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload(ImageUploadModel model)
        {
            var test = new ImageHandler();
            await test.UploadImage(model).ReturnOkResult();
            return Ok();
        }
    }
}
