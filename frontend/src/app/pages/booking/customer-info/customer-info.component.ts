import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './customer-info.component.html',
})
export class CustomerInfoComponent implements OnInit {
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

  constructor(private bookingService: BookingService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  submitCustomerInfo(): void {
    if (this.customerInfo.termsConsent) {
      this.bookingService.setCustomerInfo(this.customerInfo);
      this.router.navigate(['/booking/confirmation']);
    } else {
      console.log('Terms consent required');
    }
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.customerInfo = {
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
      }; // Adjust property name
    }
  }
}