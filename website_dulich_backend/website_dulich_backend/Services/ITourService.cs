using website_dulich_backend.DTOs.Tour;

namespace website_dulich_backend.Services
{
    public interface ITourService
    {
        Task<(List<TourResponse>, int total)> GetToursAsync(TourQueryDto query);

        Task<TourResponse> CreateTour(CreateTourRequest request);

        Task<TourResponse?> UpdateTour(Guid id, UpdateTourRequest request);

        Task<TourResponse?> GetTourByIdAsync(Guid id);

        Task<bool> DeleteTour(Guid id);
    }
}