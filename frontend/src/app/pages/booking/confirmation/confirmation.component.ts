import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {
  bookingData: any;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
    this.router.navigate(['/booking/customer-info'], { state: { customerInfo: this.bookingData?.customerInfo } });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.bookingData = this.bookingService.getBookingData();
    } else {
      this.bookingData = {};
    }
  }
}