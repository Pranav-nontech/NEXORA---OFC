import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff.component.html',
})
export class StaffComponent {
  staff = [
    { id: 1, name: 'Jane Doe', role: 'Stylist' }
  ];

  addStaff(staff: { name: string; role: string }): void {
    this.staff.push({ id: this.staff.length + 1, ...staff });
    console.log('Staff Added:', staff);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}