import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [FormsModule, RouterLink], // FormsModule for form
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  customerInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: '',
    termsConsent: false
  };

  bookingDetails = {
    service: 'Haircut',
    staff: 'Jane Doe',
    date: new Date(),
    price: 25
  };

  confirmBooking(): void {
    if (this.customerInfo.termsConsent) {
      console.log('Booking Confirmed:', { customer: this.customerInfo, details: this.bookingDetails });
    } else {
      console.log('Terms consent required');
    }
  }
}