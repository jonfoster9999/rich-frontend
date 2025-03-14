import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Artwork } from './artworks/artwork.model';

export interface Gallery {
  id: number;
  name: string;
  sort_order?: number;
  artworks?: Artwork[];
}

// Define constants outside the interface
export const HOME_GALLERY_ID = -1;

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private baseUrl = environment.apiPrefix;

  constructor(private http: HttpClient) {}

  getGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.baseUrl}/galleries`);
  }

  getGalleryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/galleries/${id}`);
  }
}
