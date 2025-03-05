import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

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
      return this.api.get('bookings/services');
    }
    return of([]);
  }

  getStaff(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('bookings/staff');
    }
    return of([]);
  }

  getTimeSlots(date: string): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get(`bookings/time-slots?date=${date}`);
    }
    return of([]);
  }

  createBooking(booking: any): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.post('bookings/create', booking);
    }
    return of({});
  }

  getBookings(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.get('bookings');
    }
    return of([]);
  }

  cancelBooking(id: number): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.api.post(`bookings/${id}/cancel`, {});
    }
    return of({});
  }
}