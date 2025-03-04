import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent {
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

  constructor(private bookingService: BookingService, private router: Router) {}

  submitCustomerInfo(): void {
    if (this.customerInfo.termsConsent) {
      this.bookingService.setCustomerInfo(this.customerInfo);
      this.router.navigate(['/booking/confirmation']);
    } else {
      console.log('Terms consent required');
    }
  }
}