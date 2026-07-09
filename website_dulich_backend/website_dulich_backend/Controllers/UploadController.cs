using Microsoft.AspNetCore.Mvc;
using website_dulich_backend.DTOs.Upload;
using website_dulich_backend.Services;

namespace website_dulich_backend.Controllers
{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private readonly IUploadService _uploadService;

        public UploadController(
            IUploadService uploadService)
        {
            _uploadService = uploadService;
        }

        [HttpPost]
        public async Task<ActionResult<UploadResponse>> Upload(IFormFile file)
        {
            var url =
                await _uploadService.UploadImageAsync(file);

            return Ok(new UploadResponse
            {
                Url = url
            });
        }
    }
}
