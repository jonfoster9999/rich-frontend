import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService, Gallery } from '../gallery.service';
import { Artwork } from '../artworks/artwork.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  galleries: Gallery[] = [];
  currentGallery: Gallery | null = null;
  newGalleryName: string = '';
  selectedFiles: File[] = [];
  uploadProgress: number = 0;
  isUploading: boolean = false;
  message: string = '';

  constructor(
    private galleryService: GalleryService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadGalleries();
  }

  loadGalleries(): void {
    this.galleryService.getGalleries().subscribe((galleries) => {
      this.galleries = galleries;
    });
  }

  selectGallery(gallery: Gallery): void {
    this.galleryService.getGalleryById(gallery.id).subscribe((data) => {
      this.currentGallery = data;
    });
  }

  createGallery(): void {
    if (!this.newGalleryName.trim()) return;

    this.http
      .post<Gallery>(`${environment.apiPrefix}/galleries`, {
        name: this.newGalleryName,
      })
      .subscribe({
        next: (gallery) => {
          this.galleries.push(gallery);
          this.newGalleryName = '';
          this.message = 'Gallery created successfully!';
        },
        error: (error) => {
          this.message = 'Error creating gallery: ' + error.message;
        },
      });
  }

  updateGallery(): void {
    if (!this.currentGallery) return;

    this.http
      .put(`${environment.apiPrefix}/galleries/${this.currentGallery.id}`, {
        name: this.currentGallery.name,
      })
      .subscribe({
        next: () => {
          this.message = 'Gallery updated successfully!';
          this.loadGalleries();
        },
        error: (error) => {
          this.message = 'Error updating gallery: ' + error.message;
        },
      });
  }

  deleteGallery(): void {
    if (!this.currentGallery) return;

    if (
      confirm(
        `Are you sure you want to delete the gallery "${this.currentGallery.name}"?`
      )
    ) {
      this.http
        .delete(`${environment.apiPrefix}/galleries/${this.currentGallery.id}`)
        .subscribe({
          next: () => {
            this.message = 'Gallery deleted successfully!';
            this.galleries = this.galleries.filter(
              (g) => g.id !== this.currentGallery?.id
            );
            this.currentGallery = null;
          },
          error: (error) => {
            this.message = 'Error deleting gallery: ' + error.message;
          },
        });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  uploadFiles(): void {
    if (!this.currentGallery || this.selectedFiles.length === 0) return;

    this.isUploading = true;
    this.uploadProgress = 0;
    this.message = '';

    // Use the batch upload endpoint for multiple files
    if (this.selectedFiles.length > 1) {
      const formData = new FormData();
      formData.append('gallery_id', this.currentGallery.id.toString());

      // Append all files to the form data
      this.selectedFiles.forEach((file) => {
        formData.append('files[]', file);
      });

      this.http
        .post(`${environment.apiPrefix}/batch_uploads`, formData)
        .subscribe({
          next: (response: any) => {
            this.isUploading = false;
            this.selectedFiles = [];

            if (response.failed_count > 0) {
              this.message = `Upload complete: ${response.successful_count} files uploaded successfully, ${response.failed_count} failed.`;
            } else {
              this.message = `All ${response.successful_count} files uploaded successfully!`;
            }

            // Refresh the current gallery to show new uploads
            if (this.currentGallery) {
              this.selectGallery(this.currentGallery);
            }
          },
          error: (error) => {
            this.isUploading = false;
            this.message = `Error during batch upload: ${
              error.message || 'Unknown error'
            }`;
          },
        });
    } else {
      // For a single file, use the standard artwork endpoint
      const file = this.selectedFiles[0];
      const formData = new FormData();
      formData.append('artwork_file', file);
      formData.append('gallery_id', this.currentGallery.id.toString());

      this.http.post(`${environment.apiPrefix}/artworks`, formData).subscribe({
        next: () => {
          this.isUploading = false;
          this.selectedFiles = [];
          this.message = 'File uploaded successfully!';
          // Refresh the current gallery to show new uploads
          if (this.currentGallery) {
            this.selectGallery(this.currentGallery);
          }
        },
        error: (error) => {
          this.isUploading = false;
          this.message = `Error uploading ${file.name}: ${
            error.message || 'Unknown error'
          }`;
        },
      });
    }
  }

  deleteArtwork(artworkId: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.http
        .delete(`${environment.apiPrefix}/artworks/${artworkId}`)
        .subscribe({
          next: () => {
            this.message = 'Image deleted successfully!';
            // Refresh the current gallery
            if (this.currentGallery && this.currentGallery.artworks) {
              this.currentGallery.artworks =
                this.currentGallery.artworks.filter(
                  (artwork: Artwork) => artwork.id !== artworkId
                );
            }
          },
          error: (error) => {
            this.message = 'Error deleting image: ' + error.message;
          },
        });
    }
  }

  clearMessage(): void {
    this.message = '';
  }
}
