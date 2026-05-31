using Microsoft.EntityFrameworkCore;
using website_dulich_backend.Data;
using website_dulich_backend.DTOs;
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

        public async Task<(List<Tour>, int total)> GetToursAsync(TourQueryDto query)
        {
            IQueryable<Tour> tours =_context.Tours.Include(t => t.Images).AsQueryable();

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
                    t.Title.Contains(query.Keyword));
            }

            /* sort */

            if (query.Sort == "priceAsc")
            {
                tours = tours.OrderBy(t => t.Price);
            }
            else if (query.Sort == "priceDesc")
            {
                tours = tours.OrderByDescending(
                    t => t.Price);
            }

            int total = await tours.CountAsync();

            var data = await tours
                .Skip((query.Page - 1) * query.Limit)
                .Take(query.Limit)
                .ToListAsync();

            return (data, total);
        }

        public async Task<Tour> CreateTour(Tour tour)
        {
            _context.Tours.Add(tour);

            await _context.SaveChangesAsync();

            return tour;
        }
        public async Task<Tour?> UpdateTour(int id, Tour tour)
        {
            var existingTour =
                await _context.Tours.FindAsync(id);

            if (existingTour == null)
            {
                return null;
            }

            existingTour.Title = tour.Title;
            existingTour.Location = tour.Location;
            existingTour.Days = tour.Days;
            existingTour.Price = tour.Price;
            existingTour.DiscountPrice = tour.DiscountPrice;
            existingTour.Description = tour.Description;
            existingTour.DealEndDate = tour.DealEndDate;
            existingTour.CoverImage = tour.CoverImage;
            existingTour.Activities = tour.Activities;

            existingTour.TripType = tour.TripType;

            existingTour.Difficulty = tour.Difficulty;

            await _context.SaveChangesAsync();

            return existingTour;
        }

        public async Task<Tour?> GetTourByIdAsync(int id)
        {
            return await _context.Tours
                .Include(t => t.Images)
                .FirstOrDefaultAsync(t => t.Id == id);
        }
    }

}