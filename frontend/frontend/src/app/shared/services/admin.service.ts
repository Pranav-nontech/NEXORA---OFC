import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Services
  getServices(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('services', { headers: this.getHeaders() });
    }
    return of([]);
  }

  createService(service: any): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.post('services', service, { headers: this.getHeaders() });
    }
    return of({});
  }

  // Staff
  getStaff(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('staff', { headers: this.getHeaders() });
    }
    return of([]);
  }

  createStaff(staff: any): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.post('staff', staff, { headers: this.getHeaders() });
    }
    return of({});
  }

  // Customers
  getCustomers(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('users?accountType=customer', { headers: this.getHeaders() });
    }
    return of([]);
  }

  deleteCustomer(customerId: string): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.delete(`users/${customerId}`, { headers: this.getHeaders() });
    }
    return of({});
  }

  // Bookings (for Calendar and Dashboard)
  getBookings(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('bookings', { headers: this.getHeaders() });
    }
    return of([]);
  }

  // Business Settings
  getBusinessSettings(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('business/settings', { headers: this.getHeaders() });
    }
    return of({});
  }

  updateBusinessSettings(settings: any): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.post('business/settings', settings, { headers: this.getHeaders() });
    }
    return of({});
  }

  // System Health
  checkSystemHealth(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('health', { headers: this.getHeaders() });
    }
    return of({ status: 'Online' });
  }
}