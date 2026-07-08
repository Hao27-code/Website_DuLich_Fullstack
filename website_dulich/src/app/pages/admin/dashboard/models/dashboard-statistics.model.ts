/**
 * Thống kê tổng quan hiển thị trên Dashboard.
 * Dữ liệu lấy từ API Dashboard.
 */
export interface DashboardStatistics {
  /** Tổng số tour */
  totalTours: number;

  /** Tổng số bài viết */
  totalNews: number;

  /** Tổng số người dùng */
  totalUsers: number;

  /** Tổng số đơn đặt tour */
  totalBookings: number;
}
