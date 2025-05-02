import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = 'user1';
  password = 'password1';
  error = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error.set('');
    this.authService.login(this.username, this.password).subscribe({
      error: () => this.error.set('Invalid credentials'),
    });
  }
}
