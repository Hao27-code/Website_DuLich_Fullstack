namespace website_dulich_backend.DTOs.Tour;

public class TourQueryDto
{
    public List<string>? Destination { get; set; }

    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }

    public int? MinDays { get; set; }
    public int? MaxDays { get; set; }

    public string? Keyword { get; set; }

    public List<string>? Activities { get; set; }

    public List<string>? TripTypes { get; set; }

    public string? Difficulty { get; set; }

    public bool? IsActive { get; set; }

    public string? Sort { get; set; }

    public int Page { get; set; } = 1;

    public int Limit { get; set; } = 12;
}