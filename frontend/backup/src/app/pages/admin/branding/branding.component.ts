import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [FormsModule, CommonModule], // Added for ngModel
  templateUrl: './branding.component.html',
})
export class BrandingComponent {
  branding = {
    logoUrl: '',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d'
  };

  updateBranding(): void {
    console.log('Branding Updated:', this.branding);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}