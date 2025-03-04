import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule], // Added for ngModel
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  businessSettings = {
    name: 'Nexora Salon',
    hours: '9 AM - 5 PM',
    location: '123 Main St'
  };

  saveSettings(): void {
    console.log('Settings Saved:', this.businessSettings);
  }
}