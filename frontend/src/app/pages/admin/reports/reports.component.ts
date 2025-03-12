import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  reportData = {
    bookingsThisMonth: 20,
    revenueThisMonth: 2000
  };

  reports: any[] = [];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.reports = [];
    }
  }
}