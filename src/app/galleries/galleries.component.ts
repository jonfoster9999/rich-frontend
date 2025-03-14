import { Component } from '@angular/core';
import { GalleryService, Gallery } from '../gallery.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-galleries',
  imports: [CommonModule],
  templateUrl: './galleries.component.html',
  styleUrl: './galleries.component.css',
})
export class GalleriesComponent {
  galleries: Gallery[] = [];

  constructor(private galleryService: GalleryService, private router: Router) {}

  ngOnInit() {
    this.galleryService
      .getGalleries()
      .subscribe((data) => (this.galleries = data));
  }

  viewGallery(id: number) {
    this.router.navigate([`/galleries/${id}`]);
  }
}
