using website_dulich_backend.DTOs.Tour;
using website_dulich_backend.Models;

namespace website_dulich_backend.Services
{
    public interface ITourService
    {
        Task<(List<Tour>, int total)> GetToursAsync(TourQueryDto query);
        Task<Tour> CreateTour(CreateTourRequest request);
        Task<Tour?> UpdateTour(Guid id, UpdateTourRequest request);

        Task<Tour?> GetTourByIdAsync(Guid id);
        Task<bool> DeleteTour(Guid id);
    }
}