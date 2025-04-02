import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './email-verification.component.html'
})
export class EmailVerificationComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  email: string = 'user@example.com';
  message: string = 'A verification link has been sent to your email address. Please click the link in the email to activate your Nexora account.';
  resendMessage: string = '';
  canResend: boolean = true;
  currentYear: number = new Date().getFullYear();
  verificationStatus: any = {};

  resendVerification(): void {
    if (this.canResend) {
      this.resendMessage = 'Verification link resent to ' + this.email;
      this.canResend = false;
      console.log('Resend Verification Email:', this.email);
      setTimeout(() => {
        this.canResend = true;
        this.resendMessage += ' You can resend the email in 60 seconds.';
      }, 60000);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.verificationStatus = {};
    }
  }
}