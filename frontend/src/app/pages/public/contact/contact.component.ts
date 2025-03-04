import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule], // Added FormsModule for ngModel
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
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
}