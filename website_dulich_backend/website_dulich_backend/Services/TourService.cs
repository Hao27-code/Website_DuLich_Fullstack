using website_dulich_backend.DTOs.Tour;
using website_dulich_backend.Models;
using website_dulich_backend.Repositories;

namespace website_dulich_backend.Services
{
    public class TourService : ITourService
    {
        private readonly ITourRepository _tourRepository;

        public TourService(
            ITourRepository tourRepository
        )
        {
            _tourRepository = tourRepository;
        }

        public async Task<(List<Tour>, int total)> GetToursAsync(TourQueryDto query)
        {
            return await _tourRepository
                .GetToursAsync(query);
        }

        public async Task<Tour> CreateTour(CreateTourRequest request)
        {
            return await _tourRepository.CreateTour(request);
        }


        public async Task<Tour?> UpdateTour(Guid id, UpdateTourRequest request)
        {
            return await _tourRepository.UpdateTour(id, request);
        }

        public async Task<Tour?> GetTourByIdAsync(Guid id)
        {
            return await _tourRepository
                .GetTourByIdAsync(id);


        }

        public async Task<bool> DeleteTour(Guid id)
        {
            return await _tourRepository.DeleteTour(id);
        }
    }
}