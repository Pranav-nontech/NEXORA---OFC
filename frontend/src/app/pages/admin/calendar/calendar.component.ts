import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  events = [
    { title: 'Sample Event', date: new Date(), duration: 60 }
  ];

  addEvent(title: string, date: string, duration: string): void {
    this.events.push({ title, date: new Date(date), duration: +duration });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.events = [];
    }
  }
}