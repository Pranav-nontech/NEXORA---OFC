import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  return true; // TODO(Remove) Allow all routes for now till we implement the APIs

  // Allow navigation to public and auth routes without checking authentication
  const publicRoutes = [
    '/',
    '/home',
    '/about',
    '/contact',
    '/features',
    '/pricing',
    '/faq',
    '/privacy',
    '/terms',
    '/cookie',
  ];
  const authRoutes = ['/auth/signup', '/auth/login', '/auth/forgot-password', '/auth/verify-email'];
  if (publicRoutes.includes(state.url) || authRoutes.includes(state.url)) {
    console.log(`authGuard - Allowing navigation to ${state.url} without auth check`);
    return true;
  }

  if (!isPlatformBrowser(platformId)) {
    console.log('authGuard - Running on server - redirecting to login');
    return router.createUrlTree(['/auth/login']);
  }

  // Check for JWT token in localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') || 'false';
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  if (!isLoggedIn || !currentUser || !currentUser.id) {
    console.log('authGuard - No token or user found - redirecting to login');
    return router.createUrlTree(['/auth/login']);
  }

  // Role-based access control
  const accountType = currentUser.accountType;

  // Admin routes - only accessible to business users
  if (state.url.startsWith('/admin')) {
    if (accountType !== 'business') {
      console.log('authGuard - User is not a business account - redirecting to home');
      return router.createUrlTree(['/home']);
    }
    console.log('authGuard - Business user authenticated for admin route');
    return true;
  }

  // Booking routes - accessible to authenticated users (both customer and business)
  if (state.url.startsWith('/booking')) {
    if (!accountType) {
      console.log('authGuard - No account type found - redirecting to login');
      return router.createUrlTree(['/login']);
    }
    console.log(`authGuard - ${accountType} user authenticated for booking route`);
    return true;
  }

  // Default case - allow access if authenticated
  console.log('authGuard - User is authenticated:', currentUser.id);
  return true;
};