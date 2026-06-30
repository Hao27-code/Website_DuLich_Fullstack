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

import { AuthService } from 'src/app/core/services/auth.service';
import { ForgotPasswordRequest } from 'src/app/core/models/auth/forgot-password-request';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonLabel,
    IonButton,
    IonInput,
  ],
})
export class ForgotPasswordPage {
  forgotPasswordData: ForgotPasswordRequest = {
    email: '',
  };

  validationErrors: { [key: string]: string } = {};

  errorMessage = '';

  isLoading = false;

  showSuccessModal = false;

  successMessage = '';
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
  ) {}

  forgotPassword(): void {
    this.validationErrors = {};
    this.errorMessage = '';

    this.isLoading = true;

    this.authService.forgotPassword(this.forgotPasswordData).subscribe({
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

        this.errorMessage = error.error?.message || 'Đã xảy ra lỗi.';
      },
    });
  }
  goToLoginFromModal(): void {
    this.showSuccessModal = false;

    this.navCtrl.navigateRoot('/login');
  }
  protected goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
