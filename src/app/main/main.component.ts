import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../gallery.service';
@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  gallery: any = null; // Holds the fetched gallery data
  lightboxVisible: boolean = false; // Lightbox visibility state
  lightboxImage: string = ''; // The URL of the clicked image

  constructor(
    private http: HttpClient,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {
    this.fetchGallery();
  }

  fetchGallery(): void {
    this.galleryService
      .getGalleryById(-1)
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
