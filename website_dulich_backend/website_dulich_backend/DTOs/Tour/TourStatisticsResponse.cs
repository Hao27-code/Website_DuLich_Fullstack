namespace website_dulich_backend.DTOs.Tour
{
    public class TourStatisticsResponse
    {
        public int TotalTours { get; set; }

        public int ActiveTours { get; set; }

        public int InactiveTours { get; set; }

        public int DealTours { get; set; }
    }
}
