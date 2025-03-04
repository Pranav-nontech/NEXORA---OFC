import { Component } from '@angular/core';

@Component({
  selector: 'app-integrations',
  standalone: true,
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent {
  integrations = [
    { name: 'Stripe', connected: false },
    { name: 'Google Calendar', connected: false }
  ];

  connectIntegration(name: string): void {
    console.log('Connecting:', name);
  }
}