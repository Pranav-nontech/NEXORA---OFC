import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule], // Added for ngModel
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  private platformId: Object;
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
  settings: any = {};
  businessSettings = {
    name: 'Nexora Salon',
    hours: '9 AM - 5 PM',
    location: '123 Main St'
  };

  saveSettings(): void {
    console.log('Settings Saved:', this.businessSettings);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.settings = {}; // Adjust property name
    }
  }
}