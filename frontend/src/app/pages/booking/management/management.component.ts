import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './management.component.html'
})
export class ManagementComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.bookings = [];
    }
  }
}