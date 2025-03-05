import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  navLinks = [
    { label: 'Home', path: '' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' }
  ];

  isSidebarOpen = false;
  currentRoute: string = '';
  logoSrc: string = '/assets/images/logo.png'; // Your local logo

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('?')[0];
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  isCurrentRoute(path: string): boolean {
    return this.currentRoute === (path || '/');
  }

  onLogoLoad(): void {
    console.log('Logo loaded successfully from /assets/images/logo.png');
  }

  onLogoError(event: Event): void {
    console.error('Logo failed to load from /assets/images/logo.png');
    // No external fallback; log error for debugging
  }
}