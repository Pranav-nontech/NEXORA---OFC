import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-config',
  standalone: true,
  imports: [FormsModule, CommonModule], // Added for ngModel
  templateUrl: './ai-config.component.html',
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
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}