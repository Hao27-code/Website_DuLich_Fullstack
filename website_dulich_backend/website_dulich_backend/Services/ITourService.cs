using website_dulich_backend.DTOs;
using website_dulich_backend.Models;

namespace website_dulich_backend.Services
{
    public interface ITourService
    {
        Task<(List<Tour>, int total)> GetToursAsync(TourQueryDto query);
        Task<Tour> CreateTour(Tour tour);
        Task<Tour?> UpdateTour(int id, Tour tour);

        Task<Tour?> GetTourByIdAsync(int id);
    }
}