import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingData: any = {};

  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setService(service: any): void { this.bookingData.service = service; }
  setStaff(staff: any): void { this.bookingData.staff = staff; }
  setTimeSlot(timeSlot: any): void { this.bookingData.timeSlot = timeSlot; }
  setCustomerInfo(customerInfo: any): void { this.bookingData.customerInfo = customerInfo; }
  getBookingData(): any { return this.bookingData; }
  clearBookingData(): void { this.bookingData = {}; }

  getServices(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('services');
    }
    return of([]);
  }

  getStaff(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('staff');
    }
    return of([]);
  }

  getTimeSlots(staffId: string): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get(`time-slots?staffId=${staffId}`);
    }
    return of([]);
  }

  createBooking(booking: any): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.api.post('bookings', booking, { headers });
    }
    return of({});
  }

  getBookings(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.api.get('bookings', { headers });
    }
    return of([]);
  }

  cancelBooking(bookingId: string): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.api.delete(`bookings/${bookingId}`, { headers });
    }
    return of({});
  }
}