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
  templateUrl: './customer-info.component.html'
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

  constructor(
    private bookingService: BookingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  submitCustomerInfo(): void {
    if (!this.customerInfo.termsConsent) {
      alert('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    this.bookingService.setCustomerInfo(this.customerInfo);
    this.router.navigate(['/booking/confirmation']);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user) {
        this.customerInfo.firstName = user.fullName?.split(' ')[0] || '';
        this.customerInfo.lastName = user.fullName?.split(' ')[1] || '';
        this.customerInfo.email = user.email || '';
      }
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as { customerInfo?: any };
      if (state?.customerInfo) {
        this.customerInfo = { ...this.customerInfo, ...state.customerInfo };
      }
    } else {
      console.log('Running on server');
    }
  }
}