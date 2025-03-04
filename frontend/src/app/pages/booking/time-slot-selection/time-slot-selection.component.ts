import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-time-slot-selection',
  standalone: true,
  imports: [RouterLink], // For links
  templateUrl: './time-slot-selection.component.html',
  styleUrls: ['./time-slot-selection.component.css']
})
export class TimeSlotSelectionComponent {
  timeSlots = [
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '2:00 PM', available: true }
  ];

  selectedTime: string | null = null;

  selectTime(time: string): void {
    const slot = this.timeSlots.find(s => s.time === time);
    if (slot && slot.available) {
      this.selectedTime = time;
      console.log('Time Selected:', this.selectedTime);
    }
  }
}