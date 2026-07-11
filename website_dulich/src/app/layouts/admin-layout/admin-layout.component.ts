import { AfterViewInit, Component } from '@angular/core';
import {
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonSplitPane,
    AdminSidebarComponent,
  ],
})
export class AdminLayoutComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }
}
