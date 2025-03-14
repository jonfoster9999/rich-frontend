import { Routes } from '@angular/router';
import { GalleriesComponent } from './galleries/galleries.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { GalleryComponent } from './gallery/gallery.component';
export const appRoutes: Routes = [
  { path: '', component: MainComponent }, // Default route with photo grid
  { path: 'galleries', component: GalleriesComponent },
  { path: 'galleries/:id', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
];
