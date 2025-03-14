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

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private baseUrl = environment.apiPrefix;

  constructor(private http: HttpClient) {}

  getGalleries(): Observable<Gallery[]> {
    console.log(`about to call ${this.baseUrl}/galleries`);
    return this.http.get<Gallery[]>(`${this.baseUrl}/galleries`);
  }

  getGalleryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/galleries/${id}`);
  }
}
