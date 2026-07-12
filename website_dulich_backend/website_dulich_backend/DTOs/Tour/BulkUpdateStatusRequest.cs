namespace website_dulich_backend.DTOs.Tour
{
    public class BulkUpdateStatusRequest
    {
        public List<Guid> TourIds { get; set; } = [];

        public bool IsActive { get; set; }
    }
}
