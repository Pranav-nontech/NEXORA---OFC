import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, CommonModule], // For link
  templateUrl: './payment.component.html',
})
export class PaymentComponent {
  paymentDetails = {
    amount: 25,
    currency: 'USD'
  };

  paymentError: string = '';

  processPayment(cardNumber: string): void {
    if (cardNumber) {
      console.log('Payment Processed:', { ...this.paymentDetails, cardNumber });
      this.paymentError = '';
    } else {
      this.paymentError = 'Please enter a valid card number.';
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