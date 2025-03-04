import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [RouterLink], // For links
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
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
}