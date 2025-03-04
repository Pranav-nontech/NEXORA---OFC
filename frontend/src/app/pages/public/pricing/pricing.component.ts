import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink], // For CTA links
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  plans = [
    {
      name: 'Basic',
      price: '$29 / month', // Placeholder price; adjust as needed
      description: 'Perfect for solo entrepreneurs and small teams just getting started.',
      features: ['Limited Bookings', 'One Staff Account', 'Basic Reporting'],
      cta: 'Get Started',
      ctaLink: '/signup'
    },
    {
      name: 'Standard',
      price: '$79 / month', // Placeholder price; adjust as needed
      description: 'Our most popular plan - ideal for growing businesses needing more flexibility.',
      features: ['Unlimited Bookings', 'Multiple Staff Accounts', 'Advanced Reporting', 'Email Reminders'],
      cta: 'Upgrade Now',
      ctaLink: '/signup'
    },
    {
      name: 'Premium',
      price: '$199 / month', // Placeholder price; adjust as needed
      description: 'Enterprise-grade solution with dedicated support and custom features.',
      features: ['Everything in Standard', 'Dedicated Support', 'API Access', 'Custom Integrations'],
      cta: 'Contact Us',
      ctaLink: '/contact'
    }
  ];

  smallPrint = {
    taxNote: 'Prices exclude applicable taxes.',
    trialNote: 'All plans come with a 30-day free trial.', // Specified 30 days as an example
    cancelNote: 'Cancel anytime, no hidden fees.',
    gdprNote: 'We are committed to GDPR compliance and protecting your data. See our Privacy Policy for details.'
  };
}