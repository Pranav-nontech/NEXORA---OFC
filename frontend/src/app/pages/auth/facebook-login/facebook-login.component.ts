import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, FacebookAuthProvider } from '@angular/fire/auth';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-facebook-login',
  standalone: true,
  imports: [],
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private auth: Auth,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.signInWithFacebook();
    } else {
      console.log('Running on server');
    }
  }

  async signInWithFacebook(): Promise<void> {
    try {
      const provider = new FacebookAuthProvider();
      const result = await this.ngZone.run(() => signInWithPopup(this.auth, provider));
      const user = result.user;
      console.log('Facebook login successful:', user);
      this.ngZone.run(() => this.router.navigate(['/home']));
    } catch (error) {
      console.error('Facebook login failed:', error);
      this.ngZone.run(() => this.router.navigate(['/login']));
    }
  }
}