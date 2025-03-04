import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [RouterLink], // For CTA link
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  intro = 'Nexora simplifies booking management for your business and provides a seamless booking experience for your customers. Discover the key features that make Nexora the perfect booking solution.';

  features = [
    {
      name: 'Automated Scheduling',
      description: 'Automate your scheduling process and eliminate double-bookings. Nexora intelligently manages availability across your staff and services, ensuring seamless appointment management.',
      benefit: 'Save time, reduce errors, and keep your calendar perfectly organized.',
      compliance: 'Data secured with end-to-end encryption to meet GDPR standards.'
    },
    {
      name: 'Online Payments',
      description: 'Securely accept online payments from your customers directly through Nexora. Integrate with leading payment gateways for hassle-free transactions.',
      benefit: 'Get paid faster and reduce no-shows with upfront payment options.',
      compliance: 'PCI Compliant payments.'
    },
    {
      name: 'Customizable Booking Pages',
      description: 'Create booking pages that match your brand and provide a consistent customer experience. Customize colors, logos, and messaging to reflect your unique identity.',
      benefit: 'Enhance your brand image and create a professional booking experience.'
    },
    {
      name: 'Customer Management',
      description: 'Keep track of customers on your booking system, allowing for easy communication, booking tracking and insight into customer behaviors.',
      benefit: 'Allow for the best customer service experience.',
      compliance: 'Consent for data is required.'
    },
    {
      name: 'Reporting & Analytics',
      description: 'Track bookings through your business, allowing you to track revenue on a daily, weekly, or monthly basis.',
      benefit: 'Improved insights into your revenue and customer base.'
    },
    {
      name: 'Staff Management',
      description: "Keep track of your staff's performance and revenue, and easily manage who is on shift while on the Nexora system.",
      benefit: 'Improved workforce planning.'
    }
  ];
}