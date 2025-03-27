import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, FacebookAuthProvider, onAuthStateChanged, User } from '@angular/fire/auth';
import { firstValueFrom, from } from 'rxjs';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-facebook-login',
  standalone: true,
  imports: [],
  templateUrl: './facebook-login.component.html'
})
export class FacebookLoginComponent implements OnInit {
  isLoading: boolean = false;
  isRedirecting: boolean = false;
  errorMessage: string = '';

  private auth: Auth | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private ngZone: NgZone
  ) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.auth = inject(Auth);
        console.log('FacebookLoginComponent - Auth instance:', this.auth);
      } catch (error) {
        console.error('Failed to inject Auth service in FacebookLoginComponent:', error);
        this.errorMessage = 'Authentication service is unavailable. Please try again later.';
      }
    } else {
      console.log('Running on server - skipping Auth injection');
    }
  }

  async ngOnInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server');
      await this.router.navigate(['/login']);
      return;
    }

    if (!this.auth) {
      this.errorMessage = 'Authentication service is unavailable.';
      await this.router.navigate(['/login']);
      return;
    }

    const hasAttemptedLogin = sessionStorage.getItem('facebookLoginAttempted');
    console.log('FacebookLoginComponent - ngOnInit - hasAttemptedLogin:', hasAttemptedLogin);
    if (hasAttemptedLogin) {
      console.log('Facebook login already attempted - clearing flag and redirecting to /login');
      sessionStorage.removeItem('facebookLoginAttempted');
      await this.router.navigate(['/login']);
      return;
    }

    try {
      const user = await firstValueFrom(
        from(
          new Promise<User | null>((resolve) => {
            this.ngZone.run(() =>
              onAuthStateChanged(this.auth!, (user) => resolve(user), (error) => resolve(null))
            );
          })
        )
      );

      if (user) {
        console.log('User is already authenticated:', user.uid);
        await this.router.navigate(['/home']);
        return;
      }

      console.log('Setting facebookLoginAttempted flag to true');
      sessionStorage.setItem('facebookLoginAttempted', 'true');
      await this.signInWithFacebook();
    } catch (error) {
      console.error('Error checking auth state in FacebookLoginComponent:', error);
      await this.router.navigate(['/login']);
    }
  }

  async signInWithFacebook(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server - skipping Facebook login');
      await this.router.navigate(['/login']);
      return;
    }

    if (!this.auth) {
      this.errorMessage = 'Authentication service is unavailable.';
      await this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.isRedirecting = false;

    try {
      console.log('Initiating Facebook login popup');
      const provider = new FacebookAuthProvider();

      const popupWindow = this.openPopupWithSignIn(this.auth, provider);
      const popupClosed = await this.pollPopupClosure(popupWindow);

      if (popupClosed) {
        console.log('Popup closed by user - starting 3-second timeout before redirect');
        this.errorMessage = 'Facebook login was cancelled.';
        await this.startRedirectTimeout();
      }
    } catch (error: unknown) {
      console.error('Facebook login failed:', error);
      const firebaseError = error as { code?: string; message?: string };
      const errorCode = firebaseError.code;
      console.log('Extracted errorCode:', errorCode);
      this.isLoading = false;
      if (errorCode === 'auth/popup-closed-by-user') {
        this.errorMessage = 'Facebook login was cancelled.';
        console.log('Popup closed by user - starting 3-second timeout before redirect');
        await this.startRedirectTimeout();
      } else {
        this.errorMessage = firebaseError.message || 'An error occurred during Facebook login.';
        console.log('Other error occurred - clearing facebookLoginAttempted flag and redirecting to /login');
        this.isRedirecting = true;
        sessionStorage.removeItem('facebookLoginAttempted');
        await this.router.navigate(['/login']);
      }
    } finally {
      if (!this.isRedirecting) {
        this.isLoading = false;
      }
    }
  }

  private openPopupWithSignIn(auth: Auth, provider: FacebookAuthProvider): Window | null {
    const popupPromise = signInWithPopup(auth, provider).then(result => {
      const user = result.user;
      console.log('Facebook login successful:', user);
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, displayName: user.displayName }));
      console.log('Clearing facebookLoginAttempted flag on successful login');
      sessionStorage.removeItem('facebookLoginAttempted');
      this.ngZone.run(() => this.router.navigate(['/home']));
      return null;
    });
    return null;
  }

  private async pollPopupClosure(popupWindow: Window | null): Promise<boolean> {
    return false;
  }

  private async startRedirectTimeout(): Promise<void> {
    this.isLoading = false;
    this.isRedirecting = true;
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Redirecting to /login after timeout');
    sessionStorage.removeItem('facebookLoginAttempted');
    await this.ngZone.run(() => this.router.navigate(['/login']));
  }
}