import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';
import { DarkModeService } from '../../../shared/services/dark-mode.service'; // Updated path

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule, MatIconModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  darkMode: boolean = false;

  @ViewChild('mainContent', { static: true }) mainContent!: ElementRef<HTMLElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    // Initialize dark mode state from service
    this.darkMode = this.darkModeService.getDarkMode();
    this.applyMode();

    // Subscribe to dark mode changes
    this.darkModeService.darkMode$.subscribe((darkMode) => {
      this.darkMode = darkMode;
      this.applyMode();
    });
  }

  toggleMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  private applyMode(): void {
    // Only access DOM if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      if (this.darkMode) {
        this.mainContent.nativeElement.classList.add('dark-mode');
      } else {
        this.mainContent.nativeElement.classList.remove('dark-mode');
      }
      console.log('Main content classList:', this.mainContent.nativeElement.classList);
    }
  }
}