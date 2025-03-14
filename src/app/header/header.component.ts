import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterLink],
})
export class HeaderComponent {
  isMenuOpen = false; // State to manage mobile menu toggle
  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
