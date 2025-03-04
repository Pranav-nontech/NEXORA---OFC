import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-staff-selection',
  standalone: true,
  imports: [RouterLink], // For Privacy Policy link
  templateUrl: './staff-selection.component.html',
  styleUrls: ['./staff-selection.component.css']
})
export class StaffSelectionComponent {
  staff = [
    { id: 1, name: 'Jane Doe', role: 'Senior Stylist', bio: 'Jane has over 10 years of experience in styling and coloring.' },
    { id: 2, name: 'John Smith', role: 'Massage Therapist', bio: 'John is known for his deep tissue massage expertise.' }
  ];

  selectedStaff: { id: number; name: string; role: string; bio: string } | null = null;

  selectStaff(id: number): void {
    this.selectedStaff = this.staff.find(s => s.id === id) || null;
    console.log('Staff Selected:', this.selectedStaff);
  }
}