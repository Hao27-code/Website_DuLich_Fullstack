namespace website_dulich_backend.Services
{
    public interface IUploadService
    {
       Task<string> UploadImageAsync(IFormFile file);
    }
}
