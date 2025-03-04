import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private api: ApiService) {}

  getServices(): Observable<any[]> {
    return this.api.get('bookings/services');
  }

  getStaff(): Observable<any[]> {
    return this.api.get('bookings/staff');
  }

  getTimeSlots(date: string): Observable<any[]> {
    return this.api.get(`bookings/time-slots?date=${date}`);
  }

  createBooking(booking: any): Observable<any> {
    return this.api.post('bookings', booking);
  }

  getBookings(): Observable<any[]> {
    return this.api.get('bookings');
  }

  cancelBooking(id: number): Observable<any> {
    return this.api.post(`bookings/${id}/cancel`, {});
  }
}