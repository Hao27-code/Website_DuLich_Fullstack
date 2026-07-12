namespace website_dulich_backend.DTOs.Tour
{
    public class TourListResponse
    {
        public List<TourResponse> Data { get; set; } = [];

        public int TotalItems { get; set; }

        public int Page { get; set; }

        public int Limit { get; set; }

        public int TotalPages { get; set; }
    }
}
