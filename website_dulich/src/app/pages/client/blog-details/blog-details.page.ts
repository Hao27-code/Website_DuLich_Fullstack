import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageBannerComponent } from '../../../components/page-banner/page-banner.component';

type BlogMedia =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; posterSrc: string; alt: string };

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
  tags: string[];
  media: BlogMedia;
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'kham-pha-nhung-diem-den-du-lich-noi-bat-nhat-nam-2025',
    title: 'Khám Phá Những Điểm Đến Du Lịch Nổi Bật Nhất Năm 2025',
    excerpt:
      "Welcome to Realor Residence, where sustainability meets comfort in every corner. In this blog post, we'll explore the green innovations seamlessly integrated into the fabric of EcoLand, creating",
    content: [
      'Nội dung bài viết mẫu. Phần này có thể thay bằng dữ liệu thật từ API/CMS.',
      'Bài viết tập trung vào các điểm đến nổi bật và gợi ý lịch trình phù hợp.',
      'Bạn có thể mở rộng phần nội dung, chèn hình ảnh, và các khối nội dung khác.',
    ],
    date: '10/07/2024',
    category: 'Adventure Tours',
    tags: ['Hotel', 'Modern', 'Rent', 'Tour', 'Travel'],
    media: {
      kind: 'video',
      posterSrc: 'assets/images/tintuc/blog-s-1-1.jpg',
      alt: 'Khám phá điểm đến',
    },
  },
  {
    slug: 'hanh-trinh-am-thuc-du-lich-qua-moi-mien-an',
    title: 'Hành Trình Ẩm Thực: Du Lịch Qua Mỗi Miền Ăn',
    excerpt:
      "Welcome to Realor Residence, where sustainability meets comfort in every corner. In this blog post, we'll explore the green innovations seamlessly integrated into the fabric of EcoLand, creating",
    content: [
      'Nội dung bài viết mẫu về ẩm thực.',
      'Gợi ý trải nghiệm địa phương và món ngon theo vùng miền.',
    ],
    date: '10/07/2024',
    category: 'Adventure Tours',
    tags: ['Modern', 'Tour', 'Travel'],
    media: {
      kind: 'image',
      src: 'assets/images/tintuc/blog-s-1-4.jpg',
      alt: 'Hành trình ẩm thực',
    },
  },
];

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.page.html',
  styleUrls: ['./blog-details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    PageBannerComponent,
  ],
})
export class BlogDetailsPage implements OnInit {
  post: BlogPost | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.post = BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  }
}
