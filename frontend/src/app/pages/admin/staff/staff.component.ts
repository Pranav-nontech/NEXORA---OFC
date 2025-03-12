import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  staff = [
    { id: 1, name: 'Jane Doe', role: 'Stylist' }
  ];

  addStaff(staff: { name: string; role: string }): void {
    this.staff.push({ id: this.staff.length + 1, ...staff });
    console.log('Staff Added:', staff);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.staff = [];
    }
  }
}