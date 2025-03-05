import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [RouterLink, CommonModule], // For links
  templateUrl: './email-verification.component.html',
})
export class EmailVerificationComponent implements OnInit {
  private platformId: Object;
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
  email: string = 'user@example.com'; // Placeholder; ideally passed via route/service
  message: string = 'A verification link has been sent to your email address. Please click the link in the email to activate your Nexora account.';
  resendMessage: string = '';
  canResend: boolean = true;
  currentYear: number = new Date().getFullYear();
  verificationStatus: any = {}; // Add this property

  resendVerification(): void {
    if (this.canResend) {
      this.resendMessage = 'Verification link resent to ' + this.email;
      this.canResend = false;
      console.log('Resend Verification Email:', this.email);
      setTimeout(() => {
        this.canResend = true;
        this.resendMessage += ' You can resend the email in 60 seconds.';
      }, 60000); // 60-second throttle
    }
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.verificationStatus = {}; // Adjust property name
    }
  }
}