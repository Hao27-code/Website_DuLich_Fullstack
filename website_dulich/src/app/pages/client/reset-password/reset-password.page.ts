import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

import { ResetPasswordRequest } from 'src/app/core/models/auth/reset-password-request';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonLabel,
    IonInput,
    IonButton,
  ],
})
export class ResetPasswordPage implements OnInit {
  resetData: ResetPasswordRequest = {
    token: '',
    password: '',
    confirmPassword: '',
  };

  validationErrors: { [key: string]: string } = {};

  errorMessage = '';

  isLoading = false;

  showSuccessModal = false;

  successMessage = '';
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetData.token = params['token'] || '';
    });
  }
  resetPassword(): void {
    this.validationErrors = {};
    this.errorMessage = '';

    this.isLoading = true;

    this.authService.resetPassword(this.resetData).subscribe({
      next: (response) => {
        this.isLoading = false;

        this.successMessage = response.message;

        this.showSuccessModal = true;
      },

      error: (error) => {
        this.isLoading = false;

        if (error.status === 400 && error.error?.errors) {
          Object.keys(error.error.errors).forEach((key) => {
            this.validationErrors[key] = error.error.errors[key][0];
          });

          return;
        }

        this.errorMessage = error.error?.message || 'Đặt lại mật khẩu thất bại';
      },
    });
  }

  goToLogin(): void {
    this.showSuccessModal = false;

    this.navCtrl.navigateRoot('/login');
  }
}
