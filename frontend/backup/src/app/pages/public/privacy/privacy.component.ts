import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink, CommonModule], // For Cookie Policy link
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent {
  intro = 'At Nexora, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and share your data when you use our booking platform. We are compliant with the General Data Protection Regulation (GDPR) and other applicable privacy laws. Please read this policy carefully to understand our practices.';

  sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect your name, email address, and phone number when you create an account or make a booking. We also collect booking details such as the service selected, date, time, and any specific requirements you provide. For website analytics, we collect your IP address and device information to improve user experience (see our Cookie Policy).'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use your information to process your bookings, send booking confirmations and reminders, and communicate with you about your appointments. With your consent, we may also send you marketing emails about new services or special offers. We also use data in aggregate to improve our services and prevent fraudulent activity.'
    },
    {
      title: '3. Data Sharing and Disclosure',
      content: 'We share your information with service providers who assist us in processing payments (e.g., Stripe, PayPal), sending emails, and providing customer support. We may also disclose your information to legal authorities if required by law. We use anonymized and aggregated data with analytics partners to improve our service.'
    },
    {
      title: '4. Data Security',
      content: 'We implement industry-standard security measures to protect your data from unauthorized access, use, or disclosure. This includes encrypting sensitive data during transmission and storage, using secure servers, and implementing access controls to restrict who can access your data.'
    },
    {
      title: '5. Data Retention',
      content: 'We retain your personal information for as long as necessary to provide you with our services, comply with legal obligations (such as tax requirements), resolve disputes, and enforce our agreements. After this period, your data will be securely deleted or anonymized.'
    },
    {
      title: '6. Your Rights (GDPR)',
      content: 'Under GDPR, you have the right to access, rectify, and erase your personal data. You also have the right to restrict the processing of your data, to data portability, and to object to the processing of your data. To exercise these rights, please contact us at info@nexora.com.'
    },
    {
      title: '7. Cookies and Tracking Technologies',
      content: 'We use cookies and other tracking technologies to improve your browsing experience on our website. For more information, please see our Cookie Policy.'
    },
    {
      title: '8. Changes to This Privacy Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and, if you are a registered user, by sending you an email.'
    },
    {
      title: '9. Contact Us',
      content: 'If you have any questions or concerns about this Privacy Policy, please contact us at: Nexora at info@nexora.com.'
    }
  ];

  lastUpdated = 'March 3, 2025'; // Example date; adjust as needed
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}