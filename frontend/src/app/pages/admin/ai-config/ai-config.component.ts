import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-config',
  standalone: true,
  imports: [FormsModule], // Added for ngModel
  templateUrl: './ai-config.component.html',
  styleUrls: ['./ai-config.component.css']
})
export class AiConfigComponent {
  aiSettings = {
    personality: 'friendly',
    responseTime: 500,
    enabled: true
  };

  saveSettings(): void {
    console.log('AI Settings Saved:', this.aiSettings);
  }
}