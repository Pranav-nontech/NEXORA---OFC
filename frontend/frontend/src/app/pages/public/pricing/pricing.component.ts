import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pricing.component.html'
})
export class PricingComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  plans = [
    {
      name: 'Basic',
      price: '$29 / month',
      description: 'Perfect for solo entrepreneurs and small teams just getting started.',
      features: ['Limited Bookings', 'One Staff Account', 'Basic Reporting'],
      cta: 'Get Started',
      ctaLink: '/signup' // Reverted to '/signup' to match the updated route
    },
    {
      name: 'Standard',
      price: '$79 / month',
      description: 'Our most popular plan - ideal for growing businesses needing more flexibility.',
      features: ['Unlimited Bookings', 'Multiple Staff Accounts', 'Advanced Reporting', 'Email Reminders'],
      cta: 'Upgrade Now',
      ctaLink: '/auth/login' // Already correct
    },
    {
      name: 'Premium',
      price: '$199 / month',
      description: 'Enterprise-grade solution with dedicated support and custom features.',
      features: ['Everything in Standard', 'Dedicated Support', 'API Access', 'Custom Integrations'],
      cta: 'Contact Us',
      ctaLink: '/contact' // Already correct
    }
  ];

  smallPrint = {
    taxNote: 'Prices exclude applicable taxes.',
    trialNote: 'All plans come with a 30-day free trial.',
    cancelNote: 'Cancel anytime, no hidden fees.',
    gdprNote: 'We are committed to GDPR compliance and protecting your data. See our'
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
    }
  }
}