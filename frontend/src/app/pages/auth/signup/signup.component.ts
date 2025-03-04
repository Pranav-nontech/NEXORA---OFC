import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink], // FormsModule for ngModel, RouterLink for links
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {
    accountType: 'customer', // Default to customer
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
}