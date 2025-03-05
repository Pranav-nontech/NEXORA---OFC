import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './branding.component.html',
})
export class BrandingComponent implements OnInit {
  private platformId: Object;
  branding = {
    logoUrl: '',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d' // Corrected typo from #7c757d to #6c757d (assuming intent was gray)
  };

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }

  updateBranding(): void {
    console.log('Branding Updated:', this.branding);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.branding = {
        logoUrl: '',
        primaryColor: '#007bff',
        secondaryColor: '#6c757d'
      };
    }
  }
}