using website_dulich_backend.DTOs.Tour;
using website_dulich_backend.Repositories;

namespace website_dulich_backend.Services
{
    public class TourService : ITourService
    {
        private readonly ITourRepository _tourRepository;

        public TourService(ITourRepository tourRepository)
        {
            _tourRepository = tourRepository;
        }

        public async Task<(List<TourResponse>, int total)> GetToursAsync(TourQueryDto query)
        {
            return await _tourRepository.GetToursAsync(query);
        }

        public async Task<TourResponse> CreateTour(CreateTourRequest request)
        {

            ValidateTourRequest(request);
            return await _tourRepository.CreateTour(request);
        }


        public async Task<TourResponse?> UpdateTour(Guid id, UpdateTourRequest request)
        {
            ValidateTourRequest(request);
            return await _tourRepository.UpdateTour(id, request);
        }

        public async Task<TourResponse?> GetTourByIdAsync(Guid id)
        {
            return await _tourRepository.GetTourByIdAsync(id);
        }

        public async Task<bool> DeleteTour(Guid id)
        {
            return await _tourRepository.DeleteTour(id);
        }

        private static void ValidateTourRequest(CreateTourRequest request)
        {
            if (request.DiscountPrice.HasValue &&
                request.DiscountPrice > request.Price)
            {
                throw new ArgumentException("Giá khuyến mãi không được lớn hơn giá gốc.");
            }

            if (request.DealEndDate.HasValue && request.DealEndDate.Value.Date < DateTime.UtcNow.Date)
            {
                throw new ArgumentException("Ngày kết thúc khuyến mãi phải lớn hơn thời điểm hiện tại.");
            }
        }
        private static void ValidateTourRequest(UpdateTourRequest request)
        {
            if (request.DiscountPrice.HasValue &&
                request.DiscountPrice > request.Price)
            {
                throw new ArgumentException(
                    "Giá khuyến mãi không được lớn hơn giá gốc.");
            }

            if (request.DealEndDate.HasValue &&
                request.DealEndDate.Value < DateTime.UtcNow)
            {
                throw new ArgumentException(
                    "Ngày kết thúc khuyến mãi phải lớn hơn thời điểm hiện tại.");
            }
        }
    }
}