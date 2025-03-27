import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { firstValueFrom, from } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  let auth: Auth | undefined;

  // Allow navigation to auth routes without checking authentication
  const authRoutes = ['/auth/google', '/auth/apple', '/auth/facebook'];
  if (authRoutes.includes(state.url)) {
    console.log(`Allowing navigation to ${state.url} without auth check`);
    return true;
  }

  if (isPlatformBrowser(platformId)) {
    try {
      auth = inject(Auth);
      console.log('Auth service in authGuard:', auth);
    } catch (error) {
      console.warn('Auth service is not available during guard execution:', error);
    }
  } else {
    console.log('Running on server - skipping Auth injection in authGuard');
  }

  if (!auth) {
    console.log('Redirecting to login due to missing Auth service');
    return router.createUrlTree(['/login']);
  }

  // Check the user's authentication state for other routes
  try {
    const user = await firstValueFrom(
      from(
        new Promise<User | null>((resolve) => {
          onAuthStateChanged(auth, (user) => resolve(user), (error) => resolve(null));
        })
      )
    );

    if (!user) {
      console.log('User is not authenticated - redirecting to login');
      return router.createUrlTree(['/login']);
    }

    console.log('User is authenticated:', user.uid);
    return true;
  } catch (error) {
    console.error('Error checking auth state:', error);
    return router.createUrlTree(['/login']);
  }
};