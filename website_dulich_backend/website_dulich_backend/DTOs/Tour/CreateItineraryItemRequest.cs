namespace website_dulich_backend.DTOs.Tour
{
    public class CreateItineraryItemRequest
    {
        public int DayNumber { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
    }
}
