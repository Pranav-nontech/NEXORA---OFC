import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './management.component.html'
})
export class ManagementComponent implements OnInit {
  bookings: any[] = [];
  selectedBooking: any = null;
  error: string | null = null;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  cancelBooking(bookingId: string): void {
    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b._id !== bookingId);
        this.selectedBooking = null;
        console.log('Booking Cancelled:', bookingId);
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to cancel booking';
        console.error('Cancel Failed:', err);
      }
    });
  }

  viewDetails(booking: any): void {
    this.selectedBooking = booking;
  }

  // Public method to handle rescheduling
  rescheduleBooking(): void {
    this.router.navigate(['/booking/service-selection']);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      const token = localStorage.getItem('token');
      if (!token) {
        this.error = 'You must be logged in to view bookings';
        this.router.navigate(['/login']);
        return;
      }
      this.bookingService.getBookings().subscribe({
        next: (data) => {
          this.bookings = data;
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to fetch bookings';
          console.error('Failed to fetch bookings:', err);
        }
      });
    } else {
      console.log('Running on server');
      this.bookings = [];
    }
  }
}