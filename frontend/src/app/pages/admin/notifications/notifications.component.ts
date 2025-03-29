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

  notificationSettings = {
    emailEnabled: true,
    smsEnabled: false,
    reminderHours: 24
  };

  saveNotificationSettings(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('notificationSettings', JSON.stringify(this.notificationSettings));
      alert('Notification Settings Saved Successfully!');
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      const savedSettings = localStorage.getItem('notificationSettings');
      if (savedSettings) {
        this.notificationSettings = JSON.parse(savedSettings);
      }
    } else {
      console.log('Running on server');
      this.notificationSettings = {
        emailEnabled: false,
        smsEnabled: false,
        reminderHours: 0
      };
    }
  }
}