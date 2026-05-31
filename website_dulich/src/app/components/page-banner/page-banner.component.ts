import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
export interface BreadcrumbItem {
  label: string;
  link?: string;
}

@Component({
  selector: 'app-page-banner',
  templateUrl: './page-banner.component.html',
  styleUrls: ['./page-banner.component.scss'],
  imports: [RouterLink, CommonModule, RouterModule],
})
export class PageBannerComponent {
  @Input() title!: string;
  @Input() background!: string;
  @Input() breadcrumbs: BreadcrumbItem[] = [];
}
