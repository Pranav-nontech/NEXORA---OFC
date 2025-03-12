import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html' // No styleUrls; styles come from src/styles.css via angular.json
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  hero = {
    headline: 'Unlock Seamless Booking with Nexora: Empowering Your Business',
    subheadline: 'The white-labeled booking system designed to streamline your scheduling, delight your customers, and grow your business',
    description: 'Nexora offers a fully customizable booking platform that seamlessly integrates into your existing website. Offer your clients a branded, effortless booking experience while optimizing your operations and maximizing revenue potential. Start your free trial today and see the difference!'
  };

  features = [
    { name: 'Fully White-Labeled', description: 'Your brand, your experience. Seamlessly integrate Nexora into your website and create a consistent brand identity.' },
    { name: 'Automated Scheduling', description: 'Say goodbye to double-bookings and scheduling headaches. Nexora intelligently manages availability.' },
    { name: 'Customizable Booking Flows', description: 'Tailor the booking process to your specific needs and services.' },
    { name: 'Secure Payment Processing', description: 'Accept payments securely and easily with integrated payment gateways.' }
  ];

  featureImages = [
    '/assets/images/working-1.jpg',
    '/assets/images/working-2.jpg',
    '/assets/images/working-3.jpg',
    '/assets/images/working-4.jpg'
  ];

  testimonial = {
    quote: 'Nexora has transformed our booking process and saved us countless hours!',
    author: '[Client Name], [Business Name]'
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Client-side logic (e.g., fetch data if needed)
      console.log('Running on browser');
    } else {
      // Server-side fallback (SSR)
      console.log('Running on server');
      // Reverted to keep features populated; emptying was a mistake unless fetching dynamically
      // this.features = [];
    }
  }
}