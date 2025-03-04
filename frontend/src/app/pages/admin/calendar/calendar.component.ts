import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  events = [
    { title: 'Meeting', date: new Date(), duration: 60 }
  ];

  addEvent(event: { title: string; date: Date; duration: number }): void {
    this.events.push(event);
    console.log('Event Added:', event);
  }
}