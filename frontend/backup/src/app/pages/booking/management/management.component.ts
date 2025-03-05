import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [RouterLink, CommonModule], // For links
  templateUrl: './management.component.html',
})
export class ManagementComponent {
  bookings = [
    { id: 1, service: 'Haircut', staff: 'Jane Doe', date: new Date(), location: 'Salon A', cost: 25, notes: '' }
  ];

  selectedBooking: any = null;

  cancelBooking(id: number): void {
    this.bookings = this.bookings.filter(b => b.id !== id);
    console.log('Booking Cancelled:', id);
  }

  viewDetails(booking: any): void {
    this.selectedBooking = booking;
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}