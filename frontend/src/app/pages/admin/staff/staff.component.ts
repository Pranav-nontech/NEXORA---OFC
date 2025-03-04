import { Component } from '@angular/core';

@Component({
  selector: 'app-staff',
  standalone: true,
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {
  staff = [
    { id: 1, name: 'Jane Doe', role: 'Stylist' }
  ];

  addStaff(staff: { name: string; role: string }): void {
    this.staff.push({ id: this.staff.length + 1, ...staff });
    console.log('Staff Added:', staff);
  }
}