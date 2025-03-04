import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';

@Component({
  selector: 'app-time-slot-selection',
  standalone: true,
  imports: [RouterLink],
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

  constructor(private bookingService: BookingService, private router: Router) {}

  selectTime(time: string): void {
    const slot = this.timeSlots.find(s => s.time === time);
    if (slot && slot.available) {
      this.selectedTime = time;
      this.bookingService.setTimeSlot({ time: this.selectedTime });
      this.router.navigate(['/booking/customer-info']);
    }
  }
}