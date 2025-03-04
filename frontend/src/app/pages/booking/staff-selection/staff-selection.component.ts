import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../shared/services/booking.service';

@Component({
  selector: 'app-staff-selection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './staff-selection.component.html',
  styleUrls: ['./staff-selection.component.css']
})
export class StaffSelectionComponent {
  staff = [
    { id: 1, name: 'Jane Doe', role: 'Senior Stylist', bio: 'Jane has over 10 years of experience in styling and coloring.' },
    { id: 2, name: 'John Smith', role: 'Massage Therapist', bio: 'John is known for his deep tissue massage expertise.' }
  ];

  selectedStaff: { id: number; name: string; role: string; bio: string } | null = null;

  constructor(private bookingService: BookingService, private router: Router) {}

  selectStaff(id: number): void {
    this.selectedStaff = this.staff.find(s => s.id === id) || null;
    if (this.selectedStaff) {
      this.bookingService.setStaff(this.selectedStaff);
      this.router.navigate(['/booking/time-slot-selection']);
    }
  }
}