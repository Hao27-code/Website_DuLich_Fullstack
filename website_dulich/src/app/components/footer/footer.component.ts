import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoTwitter,
} from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonIcon],
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('footerRoot', { read: ElementRef })
  footerRoot?: ElementRef<HTMLElement>;

  private ro?: ResizeObserver;

  constructor() {
    addIcons({
      chevronForwardOutline,
      logoInstagram,
      logoFacebook,
      logoTwitter,
      logoLinkedin,
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const el = this.footerRoot?.nativeElement;
    if (!el) return;

    const apply = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty(
        '--app-footer-height',
        `${h}px`,
      );
    };

    apply();

    // Keep in sync when responsive breakpoints change / fonts load.
    this.ro = new ResizeObserver(() => apply());
    this.ro.observe(el);
  }

  ngOnDestroy() {
    this.ro?.disconnect();
    this.ro = undefined;
  }
}
