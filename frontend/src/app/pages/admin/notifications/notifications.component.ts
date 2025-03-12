import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.notifications = [];
    }
  }
}