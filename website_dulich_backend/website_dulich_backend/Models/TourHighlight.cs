namespace website_dulich_backend.Models
{
    //điểm nổi bật
    public class TourHighlight
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid TourId { get; set; }

        public string Content { get; set; } = string.Empty;

        public int SortOrder { get; set; }

        public Tour Tour { get; set; } = null!;
    }
}
