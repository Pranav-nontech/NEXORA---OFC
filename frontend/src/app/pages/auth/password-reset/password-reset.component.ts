import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  identifier: string = ''; // Changed from 'email' to 'identifier'
  message: string = '';
  error: string = '';
  resetStatus: any = {};

  resetPassword(): void {
    if (!this.identifier) {
      this.error = 'Please enter your email address, user ID, or mobile number.';
      this.message = '';
      return;
    }

    // Basic validation to determine the type of identifier
    let identifierType: string;
    if (this.identifier.includes('@') && this.identifier.includes('.')) {
      identifierType = 'email';
    } else if (/^\+?\d{10,15}$/.test(this.identifier.replace(/\s/g, ''))) {
      identifierType = 'mobile number';
    } else {
      identifierType = 'user ID';
    }

    // Simulate password reset logic
    this.message = `Password reset instructions sent to your ${identifierType}: ${this.identifier}`;
    this.error = '';
    console.log(`Reset Password Requested - Type: ${identifierType}, Value: ${this.identifier}`);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.resetStatus = {};
    }
  }
}