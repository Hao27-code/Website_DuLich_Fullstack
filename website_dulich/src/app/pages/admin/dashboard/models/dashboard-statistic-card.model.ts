/**
 * Thông tin hiển thị của một thẻ thống kê.
 */
export interface DashboardStatisticCard {
  /** Tiêu đề */
  title: string;

  /** Giá trị thống kê */
  value: number;

  /** Icon Font Awesome */
  icon: string;

  /** Màu nền icon */
  backgroundColor: string;

  /** Màu icon */
  iconColor: string;

  /** Phần trăm tăng trưởng */
  percent: number;
}
