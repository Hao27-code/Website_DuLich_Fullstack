import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { chevronDownOutline, personCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  imports: [CommonModule, IonicModule, RouterLink],
})
export class HeaderDesktopComponent implements OnInit {
  avatarLetter = '';
  isPopoverOpen = false;
  isLoggedIn = false;

  fullName = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
  ) {
    addIcons({
      chevronDownOutline,
      personCircleOutline,
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.fullName = this.authService.getFullName();

    this.avatarLetter = this.fullName
      ? this.fullName.charAt(0).toUpperCase()
      : 'U';
  }
  openUserMenu() {
    this.isPopoverOpen = true;
  }
  closeUserMenu() {
    this.isPopoverOpen = false;
  }
  async logout(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Đăng xuất',
      message: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
      cssClass: 'logout-alert',
      buttons: [
        {
          text: 'Huỷ',
          role: 'cancel',
          cssClass: 'cancel-button',
        },
        {
          text: 'Đăng xuất',
          cssClass: 'logout-button',
          handler: () => {
            this.authService.logout();
            this.closeUserMenu();
            this.router.navigateByUrl('/login', { replaceUrl: true });
          },
        },
      ],
    });

    await alert.present();
  }
}
