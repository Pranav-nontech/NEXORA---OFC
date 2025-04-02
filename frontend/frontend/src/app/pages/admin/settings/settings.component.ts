import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminService
  ) {}

  businessSettings = {
    name: '',
    hours: '',
    location: ''
  };
  error: string | null = null;

  saveSettings(): void {
    this.adminService.updateBusinessSettings(this.businessSettings).subscribe({
      next: () => {
        alert('Settings Saved Successfully!');
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to save settings';
        console.error('Failed to save settings:', err);
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.businessSettings.name = user.businessName || 'Nexora Salon';
      this.adminService.getBusinessSettings().subscribe({
        next: (settings) => {
          this.businessSettings = { ...this.businessSettings, ...settings };
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to fetch settings';
          console.error('Failed to fetch settings:', err);
        }
      });
    } else {
      console.log('Running on server');
      this.businessSettings = { name: '', hours: '', location: '' };
    }
  }
}