import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [FormsModule], // Added for ngModel
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.css']
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
}