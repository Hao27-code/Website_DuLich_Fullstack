import { TourResponse } from './tour-response.model';

export interface TourListResponse {
  data: TourResponse[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}
