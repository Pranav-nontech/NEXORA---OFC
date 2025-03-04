import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  bookingData: any;

  constructor(private bookingService: BookingService, private router: Router) {
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
}