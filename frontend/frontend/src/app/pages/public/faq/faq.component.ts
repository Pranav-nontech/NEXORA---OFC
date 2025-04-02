import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './faq.component.html' // No styleUrls; styles from src/styles.css via angular.json
})
export class FaqComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intro = "Got questions? We've got answers! Find quick solutions to common inquiries about using Nexora for your booking needs. If you can't find what you're looking for, please don't hesitate to contact us.";

  faqs = [
    { question: 'How do I book an appointment?', answer: "Simply select the service you need, choose your preferred staff member (if applicable), select a date and time, and provide your contact information. You'll receive a confirmation email once your booking is complete.", expanded: false },
    { question: 'What payment methods do you accept?', answer: 'We accept Visa, Mastercard, and PayPal.', expanded: false },
    { question: 'How do I cancel or reschedule my appointment?', answer: "You can manage your appointments through the 'Booking Management' page link in your confirmation email, or through your profile on our website. Please refer to our Terms of Service for our cancellation policy.", expanded: false },
    { question: 'Is my personal information secure?', answer: "Yes, your privacy is very important to us. We utilize industry-standard security measures to protect your personal information. Please review our Privacy Policy for more details on how we handle your data.", expanded: false },
    { question: 'How do I change my email address?', answer: "You can update your email address in the 'Customer Profile' page. After changing your address, you'll receive a verification email to confirm the new account.", expanded: false },
    { question: 'How do I change my password?', answer: "You can update your password in the 'Customer Profile' page. We recommend using a strong, unique password for security.", expanded: false },
    { question: 'What are cookies and how do you use them?', answer: "This website uses cookies to enhance your browsing experience and provide personalized services. For details on what cookies we use and how they work, please see our Cookie Policy.", expanded: false },
    { question: 'How do I contact support?', answer: "You can reach our support team by visiting our Contact Us page.", expanded: false }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Client-side logic (e.g., fetch data if needed)
      console.log('Running on browser');
    } else {
      // Server-side fallback (SSR)
      console.log('Running on server');
    }
  }
}