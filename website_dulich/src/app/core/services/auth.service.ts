import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RegisterRequest } from '../models/auth/register-request';
import { RegisterResponse } from '../models/auth/register-response';

import { LoginRequest } from '../models/auth/login-request';
import { LoginResponse } from '../models/auth/login-response';

import { ForgotPasswordRequest } from '../models/auth/forgot-password-request';
import { ForgotPasswordResponse } from '../models/auth/forgot-password-response';

import { ResetPasswordRequest } from '../models/auth/reset-password-request';
import { ResetPasswordResponse } from '../models/auth/reset-password-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7040/api/Auth';

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, request);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
  }

  /*Kiểm tra đã đăng nhập chưa.*/
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /*Lấy JWT*/
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /*tên người dùng*/
  getFullName(): string {
    return localStorage.getItem('fullName') ?? '';
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  /*dùng để phân quyền*/
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  /*xoá toàn bộ thông tin*/
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  }

  forgotPassword(request: ForgotPasswordRequest) {
    return this.http.post<ForgotPasswordResponse>(
      `${this.apiUrl}/forgot-password`,
      request,
    );
  }

  resetPassword(request: ResetPasswordRequest) {
    return this.http.post<ResetPasswordResponse>(
      `${this.apiUrl}/reset-password`,
      request,
    );
  }
}
