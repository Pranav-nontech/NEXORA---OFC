import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule], // Added FormsModule for ngModel
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  private platformId: Object;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
  contactDetails = {
    email: 'info@nexora.com',      // Your provided email
    phone: '+91 6355552828',       // Your provided phone
    supportEmail: 'support@nexora.com' // Placeholder support email; adjust if different
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
      // Add fetch logic here if needed
    } else {
       // Adjust property name
    }
  }
}