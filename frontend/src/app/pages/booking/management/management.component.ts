import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [RouterLink, CommonModule], // For links
  templateUrl: './management.component.html',
})
export class ManagementComponent implements OnInit {
  private platformId: Object;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
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
      this.bookings = []; // Adjust property name
    }
  }
}