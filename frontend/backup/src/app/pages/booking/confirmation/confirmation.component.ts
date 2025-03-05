import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent {
  bookingData: any;

  constructor(private bookingService: BookingService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.bookingData = this.bookingService.getBookingData();
  }

  confirmBooking(): void {
    this.bookingService.createBooking(this.bookingData).subscribe({
      next: (response) => {
        console.log('Booking Created:', response);
        this.bookingService.clearBookingData();
        this.router.navigate(['/booking/success']);
      },
      error: (err) => console.error('Booking Failed:', err)
    });
  }

  editBooking(): void {
    this.router.navigate(['/booking/customer-info'], { state: { customerInfo: this.bookingData.customerInfo } });
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}