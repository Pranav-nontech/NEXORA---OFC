import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingData: any = {}; // Local state for booking flow

  constructor(private api: ApiService) {}

  // Setters for booking steps
  setService(service: any): void {
    this.bookingData.service = service;
  }

  setStaff(staff: any): void {
    this.bookingData.staff = staff;
  }

  setTimeSlot(timeSlot: any): void {
    this.bookingData.timeSlot = timeSlot;
  }

  setCustomerInfo(customerInfo: any): void {
    this.bookingData.customerInfo = customerInfo;
  }

  // Getter for full booking data
  getBookingData(): any {
    return this.bookingData;
  }

  // Clear data after completion
  clearBookingData(): void {
    this.bookingData = {};
  }

  // Existing API methods
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