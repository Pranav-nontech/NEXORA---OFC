import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink], // For link
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
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
}