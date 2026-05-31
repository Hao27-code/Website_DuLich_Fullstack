namespace website_dulich_backend.Models
{

    //FAQs
    public class TourFaq
    {
        public int Id { get; set; }

        public int TourId { get; set; }

        public string Question { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;

        public int SortOrder { get; set; }

        public Tour Tour { get; set; } = null!;
    }
}
