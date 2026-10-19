import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule, NgModel} from '@angular/forms';



@Component({
  imports: [FormsModule, ],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router) { }

  onLogin() {
    if(this.email === '' || this.password === '') {
      this.message = 'Please enter both email and password';
    } else {
      this.router.navigate(['/home']);
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
} 
