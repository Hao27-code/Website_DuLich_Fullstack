using website_dulich_backend.DTOs;
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

        public async Task<Tour> CreateTour(Tour tour)
        {
            return await _tourRepository.CreateTour(
                tour
            );
        }
        public async Task<Tour?> UpdateTour(int id, Tour tour)
        {
            return await _tourRepository.UpdateTour(id, tour);
        }

        public async Task<Tour?> GetTourByIdAsync(int id)
        {
            return await _tourRepository
                .GetTourByIdAsync(id);


        }
    }
}