import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  events = [
    { title: 'Sample Event', date: new Date(), duration: 60 }
  ];

  addEvent(title: string, date: string, duration: string): void {
    this.events.push({ title, date: new Date(date), duration: +duration });
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}