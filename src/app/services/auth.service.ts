import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

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
   * Ensures a valid JWT token exists in localStorage.
   * If missing, automatically authenticates with default credentials so that
   * API requests to protected endpoints succeed seamlessly.
   */
  ensureToken(): Observable<string> {
    const existing = this.getToken();
    if (existing) {
      return of(existing);
    }

    return this.login({ email: 'admin@example.com', password: 'password123' }).pipe(
      map((res: any) => {
        if (res && res.accessToken) {
          this.saveToken(res.accessToken);
          return res.accessToken;
        }
        return '';
      }),
      catchError(() => of(''))
    );
  }
}
