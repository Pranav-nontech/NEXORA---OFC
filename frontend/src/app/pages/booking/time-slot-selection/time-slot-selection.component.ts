import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-slot-selection',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './time-slot-selection.component.html'
})
export class TimeSlotSelectionComponent implements OnInit {
  timeSlots: any[] = [];
  selectedTimeSlot: any = null;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  selectTime(timeSlot: any): void {
    if (timeSlot.isBooked) return;
    this.selectedTimeSlot = timeSlot;
    this.bookingService.setTimeSlot(timeSlot);
  }

  continueToCustomerInfo(): void {
    if (!this.selectedTimeSlot) {
      alert('Please select a time slot');
      return;
    }
    this.router.navigate(['/booking/customer-info']);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      const bookingData = this.bookingService.getBookingData();
      const staffId = bookingData.staff?._id;
      if (!staffId) {
        alert('Please select a staff member first');
        this.router.navigate(['/booking/staff-selection']);
        return;
      }
      this.bookingService.getTimeSlots(staffId).subscribe({
        next: (data) => {
          this.timeSlots = data;
          if (this.timeSlots.length === 0) {
            console.error('No time slots available for this staff member');
          }
        },
        error: (err) => console.error('Failed to fetch time slots:', err)
      });
    } else {
      console.log('Running on server');
      this.timeSlots = [];
    }
  }
}