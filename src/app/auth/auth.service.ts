import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authState = signal<AuthState>({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  state = this.authState.asReadonly();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>('http://localhost:3001/components/login', {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          console.log('response', response);

          localStorage.setItem('token', response.token);
          this.authState.set({
            token: response.token,
            isAuthenticated: true,
          });
          this.router.navigate(['/']);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.set({
      token: null,
      isAuthenticated: false,
    });
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.authState().token;
  }
}
