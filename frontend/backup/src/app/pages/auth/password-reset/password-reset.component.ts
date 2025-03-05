import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule], // FormsModule for ngModel
  templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent {
  email: string = '';
  message: string = '';
  error: string = '';

  resetPassword(): void {
    if (this.email) {
      this.message = 'Password reset link sent to ' + this.email;
      this.error = '';
      console.log('Reset Password Requested:', this.email);
    } else {
      this.error = 'Please enter your email.';
      this.message = '';
    }
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}