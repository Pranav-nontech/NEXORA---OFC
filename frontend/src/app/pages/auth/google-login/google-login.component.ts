import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from '@angular/fire/auth';
import { firstValueFrom, from } from 'rxjs';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [],
  templateUrl: './google-login.component.html'
})
export class GoogleLoginComponent implements OnInit {
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
        console.log('GoogleLoginComponent - Auth instance:', this.auth);
      } catch (error) {
        console.error('Failed to inject Auth service in GoogleLoginComponent:', error);
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

    const hasAttemptedLogin = sessionStorage.getItem('googleLoginAttempted');
    console.log('GoogleLoginComponent - ngOnInit - hasAttemptedLogin:', hasAttemptedLogin);
    if (hasAttemptedLogin) {
      console.log('Google login already attempted - clearing flag and redirecting to /login');
      sessionStorage.removeItem('googleLoginAttempted');
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

      console.log('Setting googleLoginAttempted flag to true');
      sessionStorage.setItem('googleLoginAttempted', 'true');
      await this.signInWithGoogle();
    } catch (error) {
      console.error('Error checking auth state in GoogleLoginComponent:', error);
      await this.router.navigate(['/login']);
    }
  }

  async signInWithGoogle(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server - skipping Google login');
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
      console.log('Initiating Google login popup');
      const provider = new GoogleAuthProvider();

      const popupWindow = this.openPopupWithSignIn(this.auth, provider);

      const popupClosed = await this.pollPopupClosure(popupWindow);

      if (popupClosed) {
        console.log('Popup closed by user - starting 3-second timeout before redirect');
        this.errorMessage = 'Google login was cancelled.';
        await this.startRedirectTimeout();
      }
    } catch (error: unknown) {
      console.error('Google login failed:', error);
      // Type the error as FirebaseError
      const firebaseError = error as { code?: string; message?: string };
      const errorCode = firebaseError.code;
      console.log('Extracted errorCode:', errorCode);
      this.isLoading = false;
      if (errorCode === 'auth/popup-closed-by-user') {
        this.errorMessage = 'Google login was cancelled.';
        console.log('Popup closed by user - starting 3-second timeout before redirect');
        await this.startRedirectTimeout();
      } else {
        this.errorMessage = firebaseError.message || 'An error occurred during Google login.';
        console.log('Other error occurred - clearing googleLoginAttempted flag and redirecting to /login');
        this.isRedirecting = true;
        sessionStorage.removeItem('googleLoginAttempted');
        await this.router.navigate(['/login']);
      }
    } finally {
      if (!this.isRedirecting) {
        this.isLoading = false;
      }
    }
  }

  private openPopupWithSignIn(auth: Auth, provider: GoogleAuthProvider): Window | null {
    const popupPromise = signInWithPopup(auth, provider).then(result => {
      const user = result.user;
      console.log('Google login successful:', user);
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, displayName: user.displayName }));
      console.log('Clearing googleLoginAttempted flag on successful login');
      sessionStorage.removeItem('googleLoginAttempted');
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
    sessionStorage.removeItem('googleLoginAttempted');
    await this.ngZone.run(() => this.router.navigate(['/login']));
  }
}