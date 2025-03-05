import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-slot-selection',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './time-slot-selection.component.html',
})
export class TimeSlotSelectionComponent implements OnInit {
  timeSlots = [
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '2:00 PM', available: true }
  ];

  selectedTime: string | null = null;

  constructor(private bookingService: BookingService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  selectTime(time: string): void {
    const slot = this.timeSlots.find(s => s.time === time);
    if (slot && slot.available) {
      this.selectedTime = time;
      this.bookingService.setTimeSlot({ time: this.selectedTime });
      this.router.navigate(['/booking/customer-info']);
    }
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.timeSlots = []; // Adjust property name
    }
  }
}