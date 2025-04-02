import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(email: string, password: string): Observable<any> {
    return this.api.post('auth/login', { email, password }).pipe(
      tap(response => {
        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  signup(fullName: string, email: string, password: string, accountType: string, marketingConsent: boolean): Observable<any> {
    return this.api.post('auth/signup', { fullName, email, password, accountType, marketingConsent }).pipe(
      tap(response => {
        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  resetPassword(email: string): Observable<any> {
    return this.api.post('auth/reset-password', { email });
  }

  verifyEmail(token: string): Observable<any> {
    return this.api.post('auth/verify-email', { token });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User logged out');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}