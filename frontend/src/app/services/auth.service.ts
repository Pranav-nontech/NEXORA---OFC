import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { User } from '../models/user.model';

interface RegistrationResponse {
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth: Auth,
    private http: HttpClient,
  ) {}

  isAuthAvailable(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('AuthService - Running on server, auth not available');
      return false;
    }
    console.log('AuthService - Auth instance:', this.auth);
    return !!this.auth;
  }

  public signup(userData: User) {
    return this.http.post<RegistrationResponse>('http://localhost:5000/api/auth/register', userData, { withCredentials: true }).pipe(
      map((response) => {
        console.log('Registration response:', response);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Registration failed,', error);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('isLoggedIn', 'false');
          localStorage.removeItem('user');
        }
        return of(false);
      })
    )
  }

  public login(email: string, password: string) {
    return this.http.post<RegistrationResponse>('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true }).pipe(
      map((response) => {
        console.log('Login response:', response);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed:', error);
        if(isPlatformBrowser(this.platformId)) {
          localStorage.setItem('isLoggedIn', 'false');
          localStorage.removeItem('user');
        }
        return of(false);
      })
    )
  }
}