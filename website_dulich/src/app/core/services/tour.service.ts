import { inject, Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { TourFilter } from '../models/tour-filter.model';
import { TourResponse } from '../models/tour-response.model';
import { environment } from '../../../environments/environment';
import { CreateTourRequest } from '../models/create-tour-request.model';
import { TourListResponse } from '../models/tour-list-response.model';
import { UpdateTourRequest } from '../models/update-tour-request.model';
import { TourStatisticsResponse } from '../models/tour-statistics-response.model';
@Injectable({
  providedIn: 'root',
})
export class TourService {
  /* địa chỉ API tour */
  private readonly apiUrl = `${environment.apiUrl}/Tour`;

  /* inject HttpClient để gọi API */
  private http = inject(HttpClient);

  /* lấy danh sách tour */

  getTours(filters: TourFilter): Observable<TourListResponse> {
    /* tạo query params rỗng */
    let params = new HttpParams();

    /* =======================
       filter điểm đến
    ======================= */

    if (filters.destination && filters.destination.length) {
      filters.destination.forEach((d: string) => {
        params = params.append('destination', d);
      });
    }

    /* =======================
       filter giá
    ======================= */

    if (filters.minPrice !== undefined && filters.minPrice !== 1299000) {
      params = params.set('minPrice', filters.minPrice);
    }

    if (filters.maxPrice !== undefined && filters.maxPrice !== 2799000) {
      params = params.set('maxPrice', filters.maxPrice);
    }

    if (filters.minDays !== undefined && filters.minDays !== 0) {
      params = params.set('minDays', filters.minDays);
    }

    if (filters.maxDays !== undefined && filters.maxDays !== 5) {
      params = params.set('maxDays', filters.maxDays);
    }

    /* =======================
       filter thời lượng tour
    ======================= */

    /* số ngày tối thiểu */

    if (filters.minDays !== undefined) {
      params = params.set('minDays', filters.minDays);
    }

    /* số ngày tối đa */

    if (filters.maxDays !== undefined) {
      params = params.set('maxDays', filters.maxDays);
    }

    /* =======================
       filter từ khóa tìm kiếm
    ======================= */

    if (filters.keyword) {
      params = params.set('keyword', filters.keyword ?? '');
    }

    if (filters.activities && filters.activities.length > 0) {
      filters.activities.forEach((a: string) => {
        params = params.append('activities', a);
      });
    }
    if (filters.tripTypes && filters.tripTypes.length > 0) {
      filters.tripTypes.forEach((t: string) => {
        params = params.append('tripTypes', t);
      });
    }
    if (filters.difficulty) {
      params = params.set('difficulty', filters.difficulty);
    }
    /* =======================
       phân trang
    ======================= */

    /* trang hiện tại */

    params = params.set('page', filters.page || 1);

    /* số tour mỗi trang */

    params = params.set('limit', filters.limit || 12);

    /* =======================
       sắp xếp
    ======================= */

    if (filters.sort) {
      params = params.set('sort', filters.sort);
    }

    /* gọi API GET và gửi params */

    return this.http.get<TourListResponse>(this.apiUrl, { params });
  }
  /*lấy riêng tour đang deal*/
  /* lấy riêng tour đang deal */

  getDealTours(): Observable<TourResponse[]> {
    const emptyFilter: TourFilter = {};

    return this.getTours(emptyFilter).pipe(
      map((response: TourListResponse) => {
        const now = new Date();

        return response.data.filter(
          (tour) =>
            !!tour.discountPrice &&
            !!tour.dealEndDate &&
            new Date(tour.dealEndDate) > now,
        );
      }),
    );
  }

  getTourById(id: string) {
    return this.http.get<TourResponse>(`${this.apiUrl}/${id}`);
  }

  createTour(request: CreateTourRequest): Observable<TourResponse> {
    return this.http.post<TourResponse>(this.apiUrl, request);
  }

  updateTour(id: string, request: UpdateTourRequest): Observable<TourResponse> {
    return this.http.put<TourResponse>(`${this.apiUrl}/${id}`, request);
  }
  deleteTour(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // trạng thái bán tour
  updateStatus(id: string, isActive: boolean): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/status`, {
      isActive,
    });
  }

  //thay đổi trạng thái bán tour hàng loạt
  bulkUpdateStatus(
    ids: string[],
    isActive: boolean,
  ): Observable<{ updated: number }> {
    return this.http.patch<{ updated: number }>(`${this.apiUrl}/status`, {
      tourIds: ids,
      isActive,
    });
  }

  bulkDelete(ids: string[]): Observable<{ deleted: number }> {
    return this.http.request<{ deleted: number }>(
      'DELETE',
      `${this.apiUrl}/bulk`,
      {
        body: {
          tourIds: ids,
        },
      },
    );
  }

  exportExcel(filters: TourFilter): Observable<Blob> {
    let params = new HttpParams();

    if (filters.keyword) {
      params = params.set('keyword', filters.keyword);
    }

    // Thêm các filter khác giống getTours()

    return this.http.get(`${this.apiUrl}/export`, {
      params,
      responseType: 'blob',
    });
  }

  getStatistics(): Observable<TourStatisticsResponse> {
    return this.http.get<TourStatisticsResponse>(`${this.apiUrl}/statistics`);
  }
}
