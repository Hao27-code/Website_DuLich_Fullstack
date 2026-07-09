using website_dulich_backend.DTOs.Tour;
using website_dulich_backend.Models;

namespace website_dulich_backend.Repositories
{
    public interface ITourRepository
    {
        Task<(List<TourResponse>, int total)> GetToursAsync(TourQueryDto query);

        Task<TourResponse> CreateTour(CreateTourRequest request);

        Task<TourResponse?> UpdateTour(Guid id, UpdateTourRequest request);

        Task<TourResponse?> GetTourByIdAsync(Guid id);

        Task<bool> DeleteTour(Guid id);
    }
}