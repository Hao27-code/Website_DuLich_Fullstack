import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonLabel,
  IonText,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterRequest } from 'src/app/core/models/auth/register-request';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    IonContent,
    IonLabel,
    IonInput,
    IonText,
    IonIcon,
    IonButton,
    FormsModule,
    CommonModule,
  ],
})
export class RegisterPage {
  errorMessage = '';
  showSuccessModal = false;
  validationErrors: { [key: string]: string } = {};
  registerData: RegisterRequest = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
  ) {}
  register() {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.showSuccessModal = true;
      },

      error: (error) => {
        this.validationErrors = {};

        if (error.status === 400 && error.error?.errors) {
          const errors = error.error.errors;

          Object.keys(errors).forEach((key) => {
            this.validationErrors[key] = errors[key][0];
          });

          return;
        }

        this.errorMessage = error.error?.message || 'Đã xảy ra lỗi';
      },
    });
  }
  closeModal(): void {
    this.showSuccessModal = false;
  }

  goLogin(): void {
    this.showSuccessModal = false;
    this.navCtrl.navigateForward('/login');
  }
}
