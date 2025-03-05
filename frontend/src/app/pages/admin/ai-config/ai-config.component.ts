import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-config',
  standalone: true,
  imports: [FormsModule, CommonModule], // Added for ngModel
  templateUrl: './ai-config.component.html',
})
export class AiConfigComponent implements OnInit {
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }private platformId: Object;
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
      this.aiSettings = {
        personality: 'default',
        responseTime: 0,
        enabled: false
      }; // Adjust property name
    }
  }
}