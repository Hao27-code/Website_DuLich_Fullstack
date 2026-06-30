import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HeaderDesktopComponent } from './components/header-desktop/header-desktop.component';
import { HeaderMobileComponent } from './components/header-mobile/header-mobile.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    HeaderDesktopComponent,
    HeaderMobileComponent,
    FooterComponent,
    CommonModule,
  ],
})
export class AppComponent implements OnInit {
  showHeader = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const path = this.router.url;
      const hiddenPaths = ['/register', '/login', '/forgot-password', '/reset-password'];
      this.showHeader = !hiddenPaths.some((hiddenPath) => path.includes(hiddenPath));
    });
  }
}
