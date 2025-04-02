import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminService
  ) {}

  events: any[] = [];
  error: string | null = null;

  addEvent(title: string, date: string, duration: string): void {
    if (!title || !date || !duration) {
      this.error = 'Please fill in all fields';
      return;
    }
    const startTime = new Date(date);
    const endTime = new Date(startTime.getTime() + (+duration * 60000));
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const staff = { name: user.fullName, _id: user.id }; // Use the logged-in business user as staff
    const timeSlot = {
      staffId: staff._id,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };
    this.adminService.createStaff({ name: staff.name, available: true }).subscribe({
      next: () => {
        this.adminService.createService({ name: title, duration: +duration, price: 0 }).subscribe({
          next: () => {
            this.events.push({ title, date: startTime, duration: +duration });
            alert('Event Added Successfully!');
            this.error = null;
          },
          error: (err) => {
            this.error = err.error.message || 'Failed to add event';
            console.error('Failed to add event:', err);
          }
        });
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to create staff';
        console.error('Failed to create staff:', err);
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.adminService.getBookings().subscribe({
        next: (bookings) => {
          this.events = bookings.map((booking: any) => ({
            title: booking.serviceId.name,
            date: new Date(booking.timeSlot),
            duration: booking.serviceId.duration
          }));
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to fetch bookings';
          console.error('Failed to fetch bookings:', err);
        }
      });
    } else {
      console.log('Running on server');
      this.events = [];
    }
  }
}