/**
 * Thông tin các đơn đặt tour mới nhất.
 * Hiển thị trong bảng Dashboard.
 */
export interface LatestBooking {
  /** Mã đơn đặt */
  id: string;

  /** Tên khách hàng */
  customerName: string;

  /** Tên tour */
  tourName: string;

  /** Ngày đặt */
  bookingDate: string;

  /** Trạng thái đơn */
  status: string;

  /** Tổng tiền */
  totalPrice: number;
}
