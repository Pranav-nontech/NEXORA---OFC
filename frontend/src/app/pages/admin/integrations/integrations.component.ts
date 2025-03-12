import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-integrations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './integrations.component.html'
})
export class IntegrationsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  integrations = [
    { name: 'Stripe', connected: false },
    { name: 'Google Calendar', connected: false }
  ];

  connectIntegration(name: string): void {
    console.log('Connecting:', name);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.integrations = [];
    }
  }
}