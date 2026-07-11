namespace website_dulich_backend.DTOs.Tour
{
    public class TourResponse
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public int Days { get; set; }

        public decimal Price { get; set; }

        public decimal? DiscountPrice { get; set; }

        public string Description { get; set; } = string.Empty;

        public DateTime? DealEndDate { get; set; }

        public string? CoverImage { get; set; }

        public List<string> AlbumImages { get; set; } = [];

        public string? Activities { get; set; }

        public string? TripType { get; set; }

        public string? Difficulty { get; set; }

        //trạng thái
        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        //điểm nổi bật
        public List<string> Highlights { get; set; } = [];

        //lịch trình
        public List<ItineraryResponse> Itineraries { get; set; } = [];

        //faq
        public List<FaqResponse> Faqs { get; set; } = [];
    }
}
