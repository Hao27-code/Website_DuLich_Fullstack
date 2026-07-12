using website_dulich_backend.DTOs.Tour;

namespace website_dulich_backend.Services
{
    public interface ITourService
    {
        Task<TourListResponse> GetToursAsync(TourQueryDto query);

        Task<TourResponse> CreateTour(CreateTourRequest request);

        Task<TourResponse?> UpdateTour(Guid id, UpdateTourRequest request);

        Task<TourResponse?> GetTourByIdAsync(Guid id);

        Task<TourStatisticsResponse> GetStatisticsAsync();

        //trang thái mở bán
        Task<bool> UpdateStatusAsync(Guid id, bool isActive);

        //thay đổi trạng thái bán tour hàng loạt
        Task<int> BulkUpdateStatusAsync(List<Guid> ids,bool isActive);

        //xóa tour
        Task<int> BulkDeleteAsync(List<Guid> ids);

        Task<byte[]> ExportExcelAsync(TourQueryDto query);

        Task<bool> DeleteTour(Guid id);
    }
}