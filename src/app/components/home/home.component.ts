import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  authService = inject(AuthService);
  http = inject(HttpClient);
  protectedData = signal<any>(null);

  getProtectedData() {
    this.http.get('http://localhost:3000/protected').subscribe({
      next: (data) => this.protectedData.set(data),
      error: () =>
        this.protectedData.set({ error: 'Failed to fetch protected data' }),
    });
  }
}
