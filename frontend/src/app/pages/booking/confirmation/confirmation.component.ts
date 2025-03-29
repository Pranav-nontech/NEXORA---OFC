import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {
  bookingData: any;
  error: string | null = null;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  confirmBooking(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'You must be logged in to confirm a booking';
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.accountType !== 'customer') {
      this.error = 'Only customers can create bookings';
      return;
    }

    const bookingPayload = {
      serviceId: this.bookingData.service._id,
      staffId: this.bookingData.staff?._id,
      timeSlotId: this.bookingData.timeSlot._id,
      customerId: user.id,
    };

    this.bookingService.createBooking(bookingPayload).subscribe({
      next: (response) => {
        console.log('Booking Created:', response);
        this.bookingService.clearBookingData();
        this.router.navigate(['/booking/success'], { state: { booking: response.booking } });
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to create booking';
        console.error('Booking Failed:', err);
      }
    });
  }

  editBooking(): void {
    this.router.navigate(['/booking/customer-info'], { state: { customerInfo: this.bookingData?.customerInfo } });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.bookingData = this.bookingService.getBookingData();
      if (!this.bookingData.service || !this.bookingData.timeSlot) {
        this.error = 'Incomplete booking data';
        this.router.navigate(['/booking/service-selection']);
      }
      console.log('Running on browser');
    } else {
      this.bookingData = {};
      console.log('Running on server');
    }
  }
}