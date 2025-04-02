import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl || 'http://localhost:5000/api'; // Updated to match backend port

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Generic request method to handle all HTTP methods
  request(method: string, endpoint: string, options: { body?: any; headers?: HttpHeaders } = {}): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(method === 'get' || method === 'delete' ? [] : {});
    }

    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.request(method, url, options);
  }

  get(endpoint: string, options: { headers?: HttpHeaders } = {}): Observable<any> {
    return this.request('get', endpoint, options);
  }

  post(endpoint: string, data: any, options: { headers?: HttpHeaders } = {}): Observable<any> {
    return this.request('post', endpoint, { body: data, headers: options.headers });
  }

  delete(endpoint: string, options: { headers?: HttpHeaders } = {}): Observable<any> {
    return this.request('delete', endpoint, options);
  }
}