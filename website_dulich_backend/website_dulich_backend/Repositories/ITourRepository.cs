using website_dulich_backend.DTOs.Tour;
using website_dulich_backend.Models;

namespace website_dulich_backend.Repositories
{
    public interface ITourRepository
    {
        Task<TourListResponse> GetToursAsync(TourQueryDto query);

        Task<TourResponse> CreateTour(CreateTourRequest request);

        Task<TourResponse?> UpdateTour(Guid id, UpdateTourRequest request);

        Task<TourResponse?> GetTourByIdAsync(Guid id);

        Task<TourStatisticsResponse> GetStatisticsAsync();

        //trang thái bán tour
        Task<bool> UpdateStatusAsync(Guid id,bool isActive);
        //thay đổi trạng thái bán tour hàng loạt    
        Task<int> BulkUpdateStatusAsync(List<Guid> ids,bool isActive);

        //xóa tour
        Task<int> BulkDeleteAsync(List<Guid> ids);

        //excel export
        Task<byte[]> ExportExcelAsync(TourQueryDto query);

        Task<bool> DeleteTour(Guid id);
    }
}