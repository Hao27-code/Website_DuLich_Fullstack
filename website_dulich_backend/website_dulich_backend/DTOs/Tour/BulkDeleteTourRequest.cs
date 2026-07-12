namespace website_dulich_backend.DTOs.Tour
{
    public class BulkDeleteTourRequest
    {
        public List<Guid> TourIds { get; set; } = [];
    }
}
