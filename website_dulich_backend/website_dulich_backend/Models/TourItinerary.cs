namespace website_dulich_backend.Models
{
    //hành trình
    public class TourItinerary
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid TourId { get; set; }

        public int DayNumber { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int SortOrder { get; set; }

        public Tour Tour { get; set; } = null!;
    }
}
