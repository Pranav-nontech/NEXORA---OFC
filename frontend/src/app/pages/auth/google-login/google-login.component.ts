import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [],
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private auth: Auth,
    private ngZone: NgZone
  ) {
    console.log('GoogleLoginComponent constructor - ngZone:', this.ngZone);
  }

  ngOnInit(): void {
    console.log('GoogleLoginComponent ngOnInit - ngZone:', this.ngZone);
    if (isPlatformBrowser(this.platformId)) {
      this.signInWithGoogle();
    } else {
      console.log('Running on server');
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      if (!this.ngZone) {
        console.error('NgZone is undefined in signInWithGoogle');
        this.router.navigate(['/login']);
        return;
      }
      const provider = new GoogleAuthProvider();
      const result = await this.ngZone.run(() => signInWithPopup(this.auth, provider));
      const user = result.user;
      console.log('Google login successful:', user);
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, displayName: user.displayName }));
      this.ngZone.run(() => this.router.navigate(['/home']));
    } catch (error) {
      console.error('Google login failed:', error);
      this.ngZone.run(() => this.router.navigate(['/login']));
    }
  }
}