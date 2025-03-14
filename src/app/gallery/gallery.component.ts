import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../gallery.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  gallery: any = null; // Holds the fetched gallery data
  lightboxVisible: boolean = false; // Lightbox visibility state
  lightboxImage: string = ''; // The URL of the clicked image

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.galleryService
      .getGalleryById(id)
      .subscribe((data) => (this.gallery = data));
  }

  openLightbox(imageUrl: string): void {
    console.log('imageurl', imageUrl);
    this.lightboxImage = imageUrl;
    this.lightboxVisible = true;
  }

  closeLightbox(): void {
    console.log('close works');
    this.lightboxVisible = false;
    this.lightboxImage = '';
  }
}
