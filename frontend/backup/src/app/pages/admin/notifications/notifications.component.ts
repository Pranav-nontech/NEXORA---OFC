import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [FormsModule, CommonModule], // Added for ngModel
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent {
  notificationSettings = {
    emailEnabled: true,
    smsEnabled: false,
    reminderHours: 24
  };

  saveNotificationSettings(): void {
    console.log('Notification Settings Saved:', this.notificationSettings);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}