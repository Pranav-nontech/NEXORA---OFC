import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-selection',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './staff-selection.component.html'
})
export class StaffSelectionComponent implements OnInit {
  staff: any[] = [];
  selectedStaff: any = null;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  selectStaff(id: string): void {
    this.selectedStaff = this.staff.find(s => s._id === id) || null;
    if (this.selectedStaff) {
      this.bookingService.setStaff(this.selectedStaff);
      this.router.navigate(['/booking/time-slot-selection']);
    }
  }

  // Public method to handle navigation
  continueWithoutStaff(): void {
    this.router.navigate(['/booking/time-slot-selection']);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.bookingService.getStaff().subscribe({
        next: (data) => {
          this.staff = data;
          if (this.staff.length === 0) {
            console.error('No staff available');
          }
        },
        error: (err) => console.error('Failed to fetch staff:', err)
      });
    } else {
      console.log('Running on server');
      this.staff = [];
    }
  }
}