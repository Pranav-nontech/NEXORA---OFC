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
    if (isPlatformBrowser(this.platformId)) {
      const integration = this.integrations.find(i => i.name === name);
      if (integration) {
        integration.connected = true;
        localStorage.setItem('integrations', JSON.stringify(this.integrations));
        alert(`${name} Connected Successfully!`);
      }
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      const savedIntegrations = localStorage.getItem('integrations');
      if (savedIntegrations) {
        this.integrations = JSON.parse(savedIntegrations);
      }
    } else {
      console.log('Running on server');
      this.integrations = [];
    }
  }
}