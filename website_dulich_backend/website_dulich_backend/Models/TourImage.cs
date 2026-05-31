using System.Text.Json.Serialization;

namespace website_dulich_backend.Models
{
    public class TourImage
    {
        public int Id { get; set; }

        public int TourId { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public int SortOrder { get; set; }

        [JsonIgnore]
        public Tour Tour { get; set; } = null!;
    }
}
