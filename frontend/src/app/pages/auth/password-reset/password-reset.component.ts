import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [FormsModule, RouterLink], // FormsModule for ngModel
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
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
}