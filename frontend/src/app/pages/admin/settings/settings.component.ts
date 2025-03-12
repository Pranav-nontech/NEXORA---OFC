import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.settings = {};
    }
  }
}