import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl || 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get(endpoint: string): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get(`${this.baseUrl}/${endpoint}`);
    }
    return of([]);
  }

  post(endpoint: string, data: any): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post(`${this.baseUrl}/${endpoint}`, data);
    }
    return of({});
  }
}