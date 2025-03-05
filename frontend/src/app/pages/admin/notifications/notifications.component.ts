import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [FormsModule, CommonModule], // Added for ngModel
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {
  private platformId: Object;
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
  notifications: any[] = [];

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
      this.notifications = []; // Adjust property name
    }
  }
}