import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  signupData = {
    accountType: 'customer',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phoneNumber: '',
    termsConsent: false,
    marketingConsent: false
  };

  signupError: string = '';

  signup(): void {
    if (!this.signupData.termsConsent) {
      this.signupError = 'You must agree to the Terms of Service and Privacy Policy.';
      return;
    }
    if (this.signupData.email && this.signupData.password && this.signupData.password === this.signupData.confirmPassword) {
      console.log('Signup Attempt:', this.signupData);
      this.signupError = '';
    } else if (!this.signupData.email || !this.signupData.password) {
      this.signupError = 'Please fill in all required fields.';
    } else {
      this.signupError = 'Passwords do not match.';
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.signupData = {
        accountType: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        phoneNumber: '',
        termsConsent: false,
        marketingConsent: false
      };
    }
  }
}