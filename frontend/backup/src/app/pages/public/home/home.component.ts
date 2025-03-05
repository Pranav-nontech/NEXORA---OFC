import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule], // For link
  templateUrl: './home.component.html',
})
export class HomeComponent {
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

  testimonial = {
    quote: 'Nexora has transformed our booking process and saved us countless hours!',
    author: '[Client Name], [Business Name]'
  };
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}