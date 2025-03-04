import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [FormsModule], // Added for ngModel
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
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
}