import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Sign In', path: '/login' },
    { label: 'Sign Up', path: '/signup' }
  ];

  isMobileNavActive = false;
  currentRoute: string = '';
  windowWidth: number = 0;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('?')[0];
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 1200 && this.isMobileNavActive) {
        this.closeMobileNav();
      }
    }
  }

  toggleMobileNav(): void {
    this.isMobileNavActive = !this.isMobileNavActive;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('mobile-nav-active', this.isMobileNavActive);
    }
  }

  closeMobileNav(): void {
    this.isMobileNavActive = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('mobile-nav-active');
    }
  }

  isCurrentRoute(path: string): boolean {
    return this.currentRoute === (path || '/home');
  }

  getIconClass(label: string): string {
    const iconMap: { [key: string]: string } = {
      'Home': 'bi-house',
      'Features': 'bi-star',
      'Pricing': 'bi-currency-dollar',
      'FAQ': 'bi-question-circle',
      'Contact': 'bi-envelope',
      'Sign In': 'bi-box-arrow-in-right',
      'Sign Up': 'bi-person-plus'
    };
    return iconMap[label] || 'bi-circle'; // Fallback icon
  }
}