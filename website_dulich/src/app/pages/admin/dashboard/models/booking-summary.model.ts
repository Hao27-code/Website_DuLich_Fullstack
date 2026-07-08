/**
 * Thống kê trạng thái đơn đặt tour.
 * Dùng để hiển thị biểu đồ tròn.
 */
export interface BookingSummary {
  /** Đơn đã xác nhận */
  confirmed: number;

  /** Đơn đang chờ xử lý */
  pending: number;

  /** Đơn đã hủy */
  cancelled: number;

  /** Đơn đã hoàn thành */
  completed: number;
}
