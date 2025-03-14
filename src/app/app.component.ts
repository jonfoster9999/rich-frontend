import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Artwork } from './artworks/artwork.model';
import { HeaderComponent } from './header/header.component';
import { appRoutes } from './app.routes';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'rich-frontend';
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  public homeImage = <Artwork>{};

  ngOnInit() {
    const prefix = '/api';
    // const prefix = 'http://localhost:3000';
    const apiUrl = `${prefix}/artworks/home`;
    // const subscribtion = this.httpClient.get<Artwork>(apiUrl).subscribe({
    //   next: (resData) => {
    //     this.homeImage = resData;
    //   },
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscribtion.unsubscribe();
    // });
  }
}
