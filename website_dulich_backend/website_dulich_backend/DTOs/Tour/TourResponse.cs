namespace website_dulich_backend.DTOs.Tour
{
    public class TourResponse
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Location { get; set; }

        public int Days { get; set; }

        public decimal Price { get; set; }

        public decimal? DiscountPrice { get; set; }

        public string? CoverImage { get; set; }
    }
}
