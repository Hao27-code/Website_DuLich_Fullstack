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
import { LoginRequest } from 'src/app/core/models/auth/login-request';
import { LoginResponse } from 'src/app/core/models/auth/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage {
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
  ) {}

  loginData: LoginRequest = {
    email: '',
    password: '',
  };

  validationErrors: { [key: string]: string } = {};

  errorMessage = '';

  isLoading = false;

  login() {
    this.validationErrors = {};
    this.errorMessage = '';

    this.isLoading = true;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;

        localStorage.setItem('token', response.token);
        localStorage.setItem('fullName', response.fullName);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);

        const role = this.authService.getRole();

        if (role === 'Admin') {
          this.navCtrl.navigateRoot('/admin/dashboard');
        } else {
          this.navCtrl.navigateRoot('/');
        }
      },

      error: (error) => {
        this.isLoading = false;

        if (error.status === 400 && error.error?.errors) {
          Object.keys(error.error.errors).forEach((key) => {
            this.validationErrors[key] = error.error.errors[key][0];
          });

          return;
        }

        this.errorMessage =
          error.error?.message || 'Email hoặc mật khẩu không đúng';
      },
    });
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goToForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }
}
