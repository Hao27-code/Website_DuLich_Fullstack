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

        public async Task<TourListResponse> GetToursAsync(TourQueryDto query)
        {
            return await _tourRepository.GetToursAsync(query);
        }

        //thẻ thống kê tour
        public async Task<TourStatisticsResponse> GetStatisticsAsync()
        {
            return await _tourRepository.GetStatisticsAsync();
        }

        //trạng thái mở bán
        public async Task<bool> UpdateStatusAsync(Guid id, bool isActive)
        {
            return await _tourRepository.UpdateStatusAsync(id, isActive);
        }

        public async Task<TourResponse> CreateTour(CreateTourRequest request)
        {
           
            ValidateTourRequest(request);
            return await _tourRepository.CreateTour(request);
        }

        //xuất excel
        public async Task<byte[]> ExportExcelAsync(TourQueryDto query)
        {
            return await _tourRepository.ExportExcelAsync(query);
        }

        //
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

        //
        private static void ValidateTourRequest(CreateTourRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                throw new ArgumentException("Tên tour không được để trống.");
            }

            if (string.IsNullOrWhiteSpace(request.Location))
            {
                throw new ArgumentException("Địa điểm không được để trống.");
            }

            if (request.Days <= 0)
            {
                throw new ArgumentException("Số ngày phải lớn hơn 0.");
            }

            if (request.Price <= 0)
            {
                throw new ArgumentException("Giá tour phải lớn hơn 0.");
            }

            if (string.IsNullOrWhiteSpace(request.CoverImage))
            {
                throw new ArgumentException("Ảnh đại diện không được để trống.");
            }

            request.AlbumImages ??= [];
            request.Highlights ??= [];
            request.Itineraries ??= [];
            request.Faqs ??= [];

            request.Title = request.Title.Trim();
            request.Location = request.Location.Trim();
            request.Description = request.Description.Trim();
            request.AlbumImages = request.AlbumImages.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();

            if (!request.AlbumImages.Any())
            {
                throw new ArgumentException(
                    "Tour phải có ít nhất một ảnh trong album.");
            }

            if (request.Highlights.Any(x => string.IsNullOrWhiteSpace(x)))
            {
                throw new ArgumentException(
                    "Điểm nổi bật không được để trống.");
            }

            if (!request.Highlights.Any())
            {
                throw new ArgumentException("Phải có ít nhất một điểm nổi bật.");
            }

            if (!request.Itineraries.Any())
            {
                throw new ArgumentException("Phải có ít nhất một lịch trình.");
            }

            if (!request.Faqs.Any())
            {
                throw new ArgumentException("Phải có ít nhất một FAQ.");
            }
            if (request.DiscountPrice.HasValue &&
                request.DiscountPrice > request.Price)
            {
                throw new ArgumentException("Giá khuyến mãi không được lớn hơn giá gốc.");
            }

            if (request.DealEndDate.HasValue && request.DealEndDate.Value.Date < DateTime.UtcNow.Date)
            {
                throw new ArgumentException("Ngày kết thúc khuyến mãi phải lớn hơn thời điểm hiện tại.");
            }

            foreach (var faq in request.Faqs)
            {
                if (string.IsNullOrWhiteSpace(faq.Question))
                    throw new ArgumentException(
                        "Câu hỏi FAQ không được để trống.");

                if (string.IsNullOrWhiteSpace(faq.Answer))
                    throw new ArgumentException(
                        "Câu trả lời FAQ không được để trống.");
            }

            foreach (var item in request.Itineraries)
            {
                if (string.IsNullOrWhiteSpace(item.Title))
                    throw new ArgumentException(
                        "Tiêu đề lịch trình không được để trống.");

                if (string.IsNullOrWhiteSpace(item.Description))
                    throw new ArgumentException(
                        "Mô tả lịch trình không được để trống.");
            }

           
        }
        private static void ValidateTourRequest(UpdateTourRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                throw new ArgumentException("Tên tour không được để trống.");
            }

            if (string.IsNullOrWhiteSpace(request.Location))
            {
                throw new ArgumentException("Địa điểm không được để trống.");
            }

            if (request.Days <= 0)
            {
                throw new ArgumentException("Số ngày phải lớn hơn 0.");
            }

            if (request.Price <= 0)
            {
                throw new ArgumentException("Giá tour phải lớn hơn 0.");
            }

            if (string.IsNullOrWhiteSpace(request.CoverImage))
            {
                throw new ArgumentException("Ảnh đại diện không được để trống.");
            }

            request.AlbumImages ??= [];
            request.Highlights ??= [];
            request.Itineraries ??= [];
            request.Faqs ??= [];

            if (request.DiscountPrice.HasValue &&
                request.DiscountPrice > request.Price)
            {
                throw new ArgumentException(
                    "Giá khuyến mãi không được lớn hơn giá gốc.");
            }

            if (request.DealEndDate.HasValue &&
                request.DealEndDate.Value.Date < DateTime.UtcNow.Date)
            {
                throw new ArgumentException(
                    "Ngày kết thúc khuyến mãi phải lớn hơn thời điểm hiện tại.");
            }

            request.Title = request.Title.Trim();
            request.Location = request.Location.Trim();
            request.Description = request.Description.Trim();

            request.AlbumImages = request.AlbumImages
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .ToList();

            if (request.Highlights.Any(x => string.IsNullOrWhiteSpace(x)))
            {
                throw new ArgumentException("Điểm nổi bật không được để trống.");
            }

            if (!request.Highlights.Any())
            {
                throw new ArgumentException("Phải có ít nhất một điểm nổi bật.");
            }

            if (!request.Itineraries.Any())
            {
                throw new ArgumentException("Phải có ít nhất một lịch trình.");
            }

            if (!request.Faqs.Any())
            {
                throw new ArgumentException("Phải có ít nhất một FAQ.");
            }

            foreach (var faq in request.Faqs)
            {
                if (string.IsNullOrWhiteSpace(faq.Question))
                    throw new ArgumentException("Câu hỏi FAQ không được để trống.");

                if (string.IsNullOrWhiteSpace(faq.Answer))
                    throw new ArgumentException("Câu trả lời FAQ không được để trống.");
            }

            foreach (var item in request.Itineraries)
            {
                if (string.IsNullOrWhiteSpace(item.Title))
                    throw new ArgumentException("Tiêu đề lịch trình không được để trống.");

                if (string.IsNullOrWhiteSpace(item.Description))
                    throw new ArgumentException("Mô tả lịch trình không được để trống.");
            }

        }

        // Cập nhật trạng thái của nhiều tour cùng lúc
        public async Task<int> BulkUpdateStatusAsync( List<Guid> ids, bool isActive)
        {
            if (ids.Count == 0)
            {
                throw new ArgumentException(
                    "Danh sách tour không được để trống.");
            }

            return await _tourRepository
                .BulkUpdateStatusAsync(
                    ids,
                    isActive);
        }

        // Xóa nhiều tour cùng lúc
        public async Task<int> BulkDeleteAsync(List<Guid> ids)
        {
            if (ids == null || ids.Count == 0)
            {
                throw new ArgumentException(
                    "Danh sách tour không được để trống.");
            }

            return await _tourRepository.BulkDeleteAsync(ids);
        }
    }
}