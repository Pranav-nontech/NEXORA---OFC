import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './contact.component.html' // No styleUrls; styles from src/styles.css via angular.json
})
export class ContactComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  contactDetails = {
    email: 'info@nexora.com',
    phone: '+91 6355552828',
    supportEmail: 'support@nexora.com'
  };

  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false
  };

  submitContact(): void {
    if (this.formData.consent) {
      console.log('Contact Form Submitted:', this.formData);
      // Reset form after submission
      this.formData = { name: '', email: '', subject: '', message: '', consent: false };
    } else {
      console.log('Consent required to submit form');
    }
  }

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