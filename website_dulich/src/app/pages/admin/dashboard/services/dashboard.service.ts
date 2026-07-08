import { Injectable } from '@angular/core';

@Injectable({
  // Đăng ký Service ở phạm vi toàn ứng dụng
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  /**
   * Lấy dữ liệu thống kê Dashboard
   */
  getStatistics() {}

  /**
   * Lấy dữ liệu biểu đồ doanh thu
   */
  getRevenueChart() {}

  /**
   * Lấy dữ liệu biểu đồ trạng thái đơn đặt tour
   */
  getBookingSummary() {}

  /**
   * Lấy danh sách các tour nổi bật
   */
  getTopTours() {}

  /**
   * Lấy danh sách các đơn đặt tour mới nhất
   */
  getLatestBookings() {}

  search(keyword: string) {
    // TODO: Gọi API sau
  }
}
