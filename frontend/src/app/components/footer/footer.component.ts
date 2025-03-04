import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  navLinks = [
    { label: 'Home', path: '' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' }
  ];

  contactInfo = {
    email: 'info@nexora.com',      // Updated to your email
    phone: '+91 6355875252'        // Updated to your phone number
  };
}