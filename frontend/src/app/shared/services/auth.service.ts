import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(email: string, password: string): Observable<any> {
    return this.api.post('auth/login', { email, password });
  }

  signup(email: string, password: string, businessName?: string): Observable<any> {
    return this.api.post('auth/signup', { email, password, businessName });
  }

  resetPassword(email: string): Observable<any> {
    return this.api.post('auth/reset-password', { email });
  }

  verifyEmail(token: string): Observable<any> {
    return this.api.post('auth/verify-email', { token });
  }

  logout(): void {
    // Placeholder for logout logic (e.g., clear local storage)
    console.log('User logged out');
  }
}