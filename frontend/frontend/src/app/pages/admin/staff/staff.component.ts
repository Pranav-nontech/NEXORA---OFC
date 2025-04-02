import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminService
  ) {}

  staff: any[] = [];
  error: string | null = null;

  addStaff(staff: { name: string; role: string }): void {
    if (!staff.name || !staff.role) {
      this.error = 'Please fill in all fields';
      return;
    }
    const newStaff = { name: staff.name, role: staff.role, available: true };
    this.adminService.createStaff(newStaff).subscribe({
      next: (createdStaff) => {
        this.staff.push(createdStaff);
        alert('Staff Added Successfully!');
        this.error = null;
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to add staff';
        console.error('Failed to add staff:', err);
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.adminService.getStaff().subscribe({
        next: (data) => {
          this.staff = data;
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to fetch staff';
          console.error('Failed to fetch staff:', err);
        }
      });
    } else {
      console.log('Running on server');
      this.staff = [];
    }
  }
}