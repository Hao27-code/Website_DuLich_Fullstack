using Microsoft.EntityFrameworkCore;
using website_dulich_backend.Data;
using website_dulich_backend.DTOs.Tour;
using website_dulich_backend.Models;

namespace website_dulich_backend.Repositories
{
    public class TourRepository : ITourRepository
    {
        private readonly AppDbContext _context;

        public TourRepository(
            AppDbContext context
        )
        {
            _context = context;
        }

        private static TourResponse MapTour(Tour tour)
        {
            return new TourResponse
            {
                Id = tour.Id,
                Title = tour.Title,
                Location = tour.Location,
                Days = tour.Days,
                Price = tour.Price,
                DiscountPrice = tour.DiscountPrice,
                Description = tour.Description,
                DealEndDate = tour.DealEndDate,
                CoverImage = tour.CoverImage,
                IsActive = tour.IsActive,
                AlbumImages = tour.Images
                    .OrderBy(x => x.SortOrder)
                    .Select(x => x.ImageUrl)
                    .ToList(),
                Highlights = tour.Highlights
                    .OrderBy(x => x.SortOrder)
                    .Select(x => x.Content)
                    .ToList(),

                Itineraries = tour.Itineraries
                    .OrderBy(x => x.DayNumber)
                    .Select(x => new ItineraryResponse
                    {
                        DayNumber = x.DayNumber,
                        Title = x.Title,
                        Description = x.Description
                    }).ToList(),

                Faqs = tour.Faqs
                    .OrderBy(x => x.SortOrder)
                    .Select(x => new FaqResponse
                    {
                        Question = x.Question,
                        Answer = x.Answer
                    }).ToList(),

                Activities = tour.Activities,
                TripType = tour.TripType,
                Difficulty = tour.Difficulty
            };
        }

        public async Task<(List<TourResponse>, int total)> GetToursAsync(TourQueryDto query)
        {
            IQueryable<Tour> tours = _context.Tours.Include(t => t.Images).AsQueryable();

            /* destination */

            if (
                query.Destination != null &&
                query.Destination.Any()
            )
            {
                tours = tours.Where(t =>
                    query.Destination.Contains(
                        t.Location
                    )
                );
            }
            /* price */

            if (query.MinPrice.HasValue)
            {
                tours = tours.Where(t =>
                    t.Price >= query.MinPrice);
            }

            if (query.MaxPrice.HasValue)
            {
                tours = tours.Where(t =>
                    t.Price <= query.MaxPrice);
            }

            /* days */

            if (query.MinDays.HasValue)
            {
                tours = tours.Where(t =>
                    t.Days >= query.MinDays);
            }

            if (query.MaxDays.HasValue)
            {
                tours = tours.Where(t =>
                    t.Days <= query.MaxDays);
            }

            /* keyword */

            if (!string.IsNullOrEmpty(query.Keyword))
            {
                tours = tours.Where(t =>
                    t.Title.Contains(query.Keyword) || t.Description.Contains(query.Keyword));
            }

            /* sort */
            //sắp xếp dữ liệu

            switch (query.Sort?.ToLower())
            {
                //giá tăng dần
                case "priceAsc":
                    tours = tours.OrderBy(t => t.Price);
                    break;

                //giá giảm dần
                case "priceDesc":
                    tours = tours.OrderByDescending(t => t.Price);
                    break;

                //tour mới nhất
                case "newest":
                    tours = tours.OrderByDescending(t => t.CreatedAt);
                    break;

                //tour cũ nhất
                case "oldest":
                    tours = tours.OrderBy(t => t.CreatedAt);
                    break;

                // Mặc định nếu không truyền sort
                default:
                    tours = tours.OrderByDescending(t => t.CreatedAt);
                    break;
            }

            int total = await tours.CountAsync();

            var toursData = await tours
            .Skip((query.Page - 1) * query.Limit)
            .Take(query.Limit)
            .ToListAsync();

            var data = toursData
                .Select(MapTour)
                .ToList();

            return (data, total);
        }

        public async Task<TourResponse> CreateTour(CreateTourRequest request)
        {
            var tour = new Tour
            {
                Title = request.Title,
                Location = request.Location,
                Days = request.Days,
                Price = request.Price,
                DiscountPrice = request.DiscountPrice,
                Description = request.Description,
                DealEndDate = request.DealEndDate,
                CoverImage = request.CoverImage,
                Activities = request.Activities,
                TripType = request.TripType,
                Difficulty = request.Difficulty,
                IsActive = request.IsActive,

                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var sortOrder = 0;

            foreach (var image in request.AlbumImages)
            {
                tour.Images.Add(new TourImage
                {
                    ImageUrl = image,
                    SortOrder = sortOrder++
                });
            }


            //điểm nổi bật
            var highlightOrder = 0;

            foreach (var item in request.Highlights)
            {
                tour.Highlights.Add(new TourHighlight
                {
                    Content = item,
                    SortOrder = highlightOrder++
                });
            }

            //lịch trình
            foreach (var item in request.Itineraries)
            {
                tour.Itineraries.Add(new TourItinerary
                {
                    DayNumber = item.DayNumber,
                    Title = item.Title,
                    Description = item.Description
                });
            }

            //faq
            var faqOrder = 0;

            foreach (var item in request.Faqs)
            {
                tour.Faqs.Add(new TourFaq
                {
                    Question = item.Question,
                    Answer = item.Answer,
                    SortOrder = faqOrder++
                });
            }

            _context.Tours.Add(tour);
            await _context.SaveChangesAsync();

            return MapTour(tour);
        }
        public async Task<TourResponse?> UpdateTour(Guid id, UpdateTourRequest request)
        {
            var existingTour = await _context.Tours.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);

            if (existingTour == null)
            {
                return null;
            }

            existingTour.Title = request.Title;
            existingTour.Location = request.Location;
            existingTour.Days = request.Days;
            existingTour.Price = request.Price;
            existingTour.DiscountPrice = request.DiscountPrice;
            existingTour.Description = request.Description;
            existingTour.DealEndDate = request.DealEndDate;
            existingTour.CoverImage = request.CoverImage;
            existingTour.Activities = request.Activities;
            existingTour.IsActive = request.IsActive;
            existingTour.TripType = request.TripType;

            existingTour.Difficulty = request.Difficulty;
            existingTour.UpdatedAt = DateTime.UtcNow;

            _context.TourImages.RemoveRange(existingTour.Images);

            existingTour.Images.Clear();

            var index = 0;

            foreach (var image in request.AlbumImages)
            {
                existingTour.Images.Add(new TourImage
                {
                    ImageUrl = image,
                    SortOrder = index++
                });
            }


            //điểm nổi bật
            _context.TourHighlights.RemoveRange(existingTour.Highlights);

            existingTour.Highlights.Clear();

            var highlightOrder = 0;

            foreach (var item in request.Highlights)
            {
                existingTour.Highlights.Add(new TourHighlight
                {
                    Content = item,
                    SortOrder = highlightOrder++
                });
            }

            //lịch trình
            _context.TourItineraries.RemoveRange(existingTour.Itineraries);

            existingTour.Itineraries.Clear();

            foreach (var item in request.Itineraries)
            {
                existingTour.Itineraries.Add(new TourItinerary
                {
                    DayNumber = item.DayNumber,
                    Title = item.Title,
                    Description = item.Description
                });
            }

            //faq
            _context.TourFaqs.RemoveRange(existingTour.Faqs);

            existingTour.Faqs.Clear();

            var faqOrder = 0;

            foreach (var item in request.Faqs)
            {
                existingTour.Faqs.Add(new TourFaq
                {
                    Question = item.Question,
                    Answer = item.Answer,
                    SortOrder = faqOrder++
                });
            }

            await _context.SaveChangesAsync();

            return MapTour(existingTour);
        }

        public async Task<TourResponse?> GetTourByIdAsync(Guid id)
        {
            var tour = await _context.Tours
                .Include(t => t.Images)
                .Include(t => t.Highlights)
                .Include(t => t.Itineraries)
                .Include(t => t.Faqs)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (tour == null)
                return null;

            return MapTour(tour);
        }

        public async Task<bool> DeleteTour(Guid id)
        {
            var tour = await _context.Tours
            .Include(t => t.Images)
            .Include(t => t.Highlights)
            .Include(t => t.Itineraries)
            .Include(t => t.Faqs)
            .FirstOrDefaultAsync(t => t.Id == id);

            if (tour == null)
            {
                return false;
            }

            _context.Tours.Remove(tour);

            await _context.SaveChangesAsync();

            return true;
        }
    }

}