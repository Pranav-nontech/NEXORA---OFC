import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'About Us', path: '/about' }, // Added About Us link
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQs', path: '/faq' },
    { label: 'Terms', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Cookies Policy', path: '/cookie' }
  ];

  contactInfo = {
    email: 'info@nexora.com',
    phone: '+91 6355875252'
  };
}