import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  reportData = {
    bookingsThisMonth: 20,
    revenueThisMonth: 2000
  };
}