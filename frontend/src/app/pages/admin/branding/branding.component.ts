import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './branding.component.html'
})
export class BrandingComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  branding = {
    logoUrl: '',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d'
  };

  updateBranding(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('branding', JSON.stringify(this.branding));
      alert('Branding Updated Successfully!');
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      const savedBranding = localStorage.getItem('branding');
      if (savedBranding) {
        this.branding = JSON.parse(savedBranding);
      }
    } else {
      console.log('Running on server');
      this.branding = {
        logoUrl: '',
        primaryColor: '#007bff',
        secondaryColor: '#6c757d'
      };
    }
  }
}