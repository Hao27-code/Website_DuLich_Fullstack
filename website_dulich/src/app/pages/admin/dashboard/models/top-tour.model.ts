/**
 * Thông tin các tour nổi bật.
 * Hiển thị trong bảng Top Tour.
 */
export interface TopTour {
  /** Mã tour */
  id: string;

  /** Tên tour */
  title: string;

  /** Số lượt đặt */
  bookings: number;

  /** Doanh thu */
  revenue: number;

  /** Ảnh đại diện */
  imageUrl: string;
}
