import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './cookie.component.html',
})
export class CookieComponent {
  intro = [
    'This website uses cookies to improve your browsing experience, personalize content, and analyze our traffic. Cookies are small text files that are stored on your device.',
    'By using Nexora, you consent to our use of cookies as described in this policy.'
  ];

  sections = [
    {
      title: 'What are Cookies?',
      content: 'Learn More about Cookies', // Placeholder for external link
      link: 'https://www.allaboutcookies.org/' // Example external link; adjust as needed
    },
    {
      title: 'How We Use Cookies',
      subSections: [
        { name: 'Essential Cookies', description: 'These cookies are necessary for the basic functionality of the website, such as session management and security.' },
        { name: 'Performance Cookies', description: 'These cookies help us understand how you use our website, allowing us to improve its performance and user experience. Example: Analyzing which pages are most popular.' },
        { name: 'Functionality Cookies', description: 'These cookies enable us to remember your preferences, such as language settings, to provide a more personalized experience.' }
        // Marketing Cookies omitted unless confirmed
      ]
    },
    {
      title: 'Managing Cookies',
      content: 'You can control and manage cookies in your browser settings. You can choose to block all cookies or only allow certain types. Please note that blocking essential cookies may impact your ability to use some features of this website.',
      links: [
        { text: 'Manage Cookies in Chrome', url: 'https://support.google.com/chrome/answer/95647' },
        { text: 'Manage Cookies in Firefox', url: 'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer' }
      ]
    },
    {
      title: 'Changes to this Cookie Policy',
      content: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page.'
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about our Cookie Policy, please contact us at info@nexora.com.'
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