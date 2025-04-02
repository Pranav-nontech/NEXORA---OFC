import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-config',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ai-config.component.html'
})
export class AiConfigComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  aiSettings = {
    personality: 'friendly',
    responseTime: 500,
    enabled: true
  };

  saveSettings(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('aiSettings', JSON.stringify(this.aiSettings));
      alert('AI Settings Saved Successfully!');
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      const savedSettings = localStorage.getItem('aiSettings');
      if (savedSettings) {
        this.aiSettings = JSON.parse(savedSettings);
      }
    } else {
      console.log('Running on server');
      this.aiSettings = {
        personality: 'default',
        responseTime: 0,
        enabled: false
      };
    }
  }
}