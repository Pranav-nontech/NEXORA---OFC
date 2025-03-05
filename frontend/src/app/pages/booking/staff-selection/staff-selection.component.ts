import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-selection',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './staff-selection.component.html',
})
export class StaffSelectionComponent implements OnInit {
  staff = [
    { id: 1, name: 'Jane Doe', role: 'Senior Stylist', bio: 'Jane has over 10 years of experience in styling and coloring.' },
    { id: 2, name: 'John Smith', role: 'Massage Therapist', bio: 'John is known for his deep tissue massage expertise.' }
  ];

  selectedStaff: { id: number; name: string; role: string; bio: string } | null = null;

  constructor(private bookingService: BookingService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  selectStaff(id: number): void {
    this.selectedStaff = this.staff.find(s => s.id === id) || null;
    if (this.selectedStaff) {
      this.bookingService.setStaff(this.selectedStaff);
      this.router.navigate(['/booking/time-slot-selection']);
    }
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.staff = []; // Adjust property name
    }
  }
}