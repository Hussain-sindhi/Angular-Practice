import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      this.message = 'Please enter both email and password';
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        if (res && res.accessToken) {
          this.authService.saveToken(res.accessToken);
        }
        this.router.navigate(['/empdetails']);
      },
      error: () => {
        // Fallback for demo navigation if offline
        this.router.navigate(['/empdetails']);
      },
    });
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
