using System.ComponentModel.DataAnnotations;

namespace website_dulich_backend.Models
{
    public class Tour
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Title { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public int Days { get; set; }

        public decimal Price { get; set; }

        public decimal? DiscountPrice { get; set; }

        public string Description { get; set; } = string.Empty;

        public DateTime? DealEndDate { get; set; }

        public string CoverImage { get; set; } = string.Empty;

        public ICollection<TourImage> Images { get; set; } = new List<TourImage>();

        public string? Activities { get; set; }

        public string? TripType { get; set; }

        public string? Difficulty { get; set; }

        public ICollection<TourHighlight> Highlights { get; set; } = new List<TourHighlight>();

        public ICollection<TourItinerary> Itineraries { get; set; } = new List<TourItinerary>();

        public ICollection<TourFaq> Faqs { get; set; } = new List<TourFaq>();


        //lưu thời gian bản ghi được tạo
        public DateTime CreatedAt { get; set; }


        //lưu thời gian bản ghi được cập nhật lần cuối
        public DateTime UpdatedAt { get; set; }
    }
}
