using System.ComponentModel.DataAnnotations;

namespace website_dulich_backend.DTOs.Tour
{
    public class CreateTourRequest
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Location { get; set; } = string.Empty;

        [Range(1, 30)]
        public int Days { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? DiscountPrice { get; set; }
        [MaxLength(5000)]
        public string Description { get; set; } = string.Empty;

        public DateTime? DealEndDate { get; set; }

        public string? CoverImage { get; set; } = string.Empty;
        public List<string> AlbumImages { get; set; } = [];

        public string? Activities { get; set; }

        public string? TripType { get; set; }

        public string? Difficulty { get; set; }
    }
}
