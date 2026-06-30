import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { PageBannerComponent } from '../../../components/page-banner/page-banner.component';
import { FooterComponent } from '../../../components/footer/footer.component';

type BlogMedia =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; posterSrc: string; alt: string };

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string; // display value
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
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
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
    FooterComponent,
  ],
})
export class BlogPage implements OnInit {
  posts: BlogPost[] = BLOG_POSTS;
  searchText = '';
  activeCategory: string | null = null;
  selectedTag: string | null = null;

  filteredPosts: BlogPost[] = [];
  categories: { name: string; count: number }[] = [];
  recentPosts: BlogPost[] = [];
  tags: string[] = [];

  constructor() {}

  ngOnInit() {
    this.categories = this.buildCategories(this.posts);
    this.recentPosts = this.posts.slice(0, 4);
    this.tags = this.buildTags(this.posts);
    this.applyFilters();
  }

  trackBySlug(_index: number, item: BlogPost) {
    return item.slug;
  }

  private buildCategories(
    posts: BlogPost[],
  ): { name: string; count: number }[] {
    const map = new Map<string, number>();
    for (const p of posts) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private buildTags(posts: BlogPost[]): string[] {
    const set = new Set<string>();
    for (const p of posts) for (const t of p.tags) set.add(t);
    return Array.from(set.values()).sort((a, b) => a.localeCompare(b));
  }

  applyFilters() {
    const q = this.searchText.trim().toLowerCase();
    this.filteredPosts = this.posts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCategory =
        !this.activeCategory || p.category === this.activeCategory;
      const matchesTag = !this.selectedTag || p.tags.includes(this.selectedTag);
      return matchesQuery && matchesCategory && matchesTag;
    });
  }

  onSearchTextChange(value: string) {
    this.searchText = value ?? '';
    this.applyFilters();
  }

  toggleCategory(name: string) {
    this.activeCategory = this.activeCategory === name ? null : name;
    this.applyFilters();
  }

  selectTag(tag: string) {
    this.selectedTag = this.selectedTag === tag ? null : tag;
    this.applyFilters();
  }
}
