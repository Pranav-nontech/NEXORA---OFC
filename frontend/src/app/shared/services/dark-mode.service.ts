import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  toggleDarkMode(): void {
    this.darkModeSubject.next(!this.darkModeSubject.value);
  }

  setDarkMode(value: boolean): void {
    this.darkModeSubject.next(value);
  }

  getDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}