import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './terms.component.html' // No styleUrls; styles from src/styles.css via angular.json
})
export class TermsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using Nexora, you agree to be bound by these Terms of Service, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.'
    },
    {
      title: 'Use License',
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on Nexora's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on Nexora's website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or 'mirror' the materials on any other server."
    },
    {
      title: 'Disclaimer',
      content: "The materials on Nexora's website are provided on an 'as is' basis. Nexora makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      title: 'Limitations',
      content: "In no event shall Nexora or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nexora's website, even if Nexora or a Nexora authorized representative has been notified orally or in writing of the possibility of such damage."
    },
    {
      title: 'Accuracy of Materials',
      content: "The materials appearing on Nexora's website could include technical, typographical, or photographic errors. Nexora does not warrant that any of the materials on its website are accurate, complete, or current. Nexora may make changes to the materials contained on its website at any time without notice."
    },
    {
      title: 'Links',
      content: "Nexora has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Nexora of the site. Use of any such linked website is at the user's own risk."
    },
    {
      title: 'Modifications',
      content: "Nexora may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms of Service."
    },
    {
      title: 'Governing Law',
      content: 'These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.'
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about these Terms of Service, please contact us at info@nexora.com.'
    }
  ];

  lastUpdated = 'March 3, 2025';

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