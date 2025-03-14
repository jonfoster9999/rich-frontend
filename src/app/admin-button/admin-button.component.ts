import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-button.component.html',
  styleUrl: './admin-button.component.css',
})
export class AdminButtonComponent {
  showDialog: boolean = false;
  password: string = '';
  errorMessage: string = '';

  // Static password for simplicity - in a real app, you'd validate against a backend
  private readonly ADMIN_PASSWORD = 'photography-admin-2024';

  constructor(private router: Router) {}

  openDialog(): void {
    this.showDialog = true;
    this.password = '';
    this.errorMessage = '';
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  submitPassword(): void {
    if (this.password === this.ADMIN_PASSWORD) {
      this.closeDialog();
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Incorrect password';
    }
  }
}
