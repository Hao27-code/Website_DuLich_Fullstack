import { Component, OnInit } from '@angular/core';
import { HeaderDesktopComponent } from '../../components/header-desktop/header-desktop.component';
import { HeaderMobileComponent } from '../../components/header-mobile/header-mobile.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss'],
  standalone: true,
  imports: [
    HeaderDesktopComponent,
    HeaderMobileComponent,
    RouterOutlet,
    FooterComponent,
  ],
})
export class ClientLayoutComponent {}
