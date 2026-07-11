import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AlbumImage } from '../../../../../../core/models/album-image.model';
import { UploadService } from '../../../../../../core/services/upload.service';
@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  private readonly uploadService = inject(UploadService);
  @Input() images: string[] = [];
  @Output() albumChanged = new EventEmitter<string[]>();

  ngOnInit(): void {
    this.albumImages = this.images.map((url) => ({
      preview: url,

      url: url,
    }));
  }

  albumImages: AlbumImage[] = [];

  onSelectImages(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files) return;

    const files = Array.from(input.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const preview = reader.result as string;

        this.uploadService
          .uploadImage(file)

          .subscribe({
            next: (response) => {
              this.albumImages.push({
                file,

                preview,

                url: response.url,
              });

              this.albumChanged.emit(this.albumImages.map((x) => x.url));
            },
          });
      };

      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.albumImages.splice(index, 1);

    this.albumChanged.emit(this.albumImages.map((x) => x.url));
  }
}
