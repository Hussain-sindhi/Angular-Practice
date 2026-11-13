import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${API_BASE_URL}/auth`;

  constructor(private http: HttpClient) {}

  register(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Returns the stored JWT token, or an empty string when the user has not
   * logged in yet. Users obtain a token through the login page; no default
   * credentials are used.
   */
  ensureToken(): Observable<string> {
    return of(this.getToken() ?? '');
  }
}
