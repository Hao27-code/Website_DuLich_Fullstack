/**
 * Dữ liệu doanh thu theo ngày/tháng/năm
 * dùng để hiển thị biểu đồ doanh thu.
 */
export interface RevenueChart {
  /** Ngày hoặc tháng */
  date: string;

  /** Tổng doanh thu */
  revenue: number;
}
