import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../login/login';

@Component({
  imports: [FormsModule, Login],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
  standalone: true
})
export class Signup {
Fullname: string = '';
email: string = '';
password: string = '';
message: string = '';
signupForm: any;

constructor(private router:Router){}
onSignup(){
if(this.Fullname === '' || this.email === '' || this.password === ''){
  alert('Please enter all the fields')
}else{
  this.router.navigate(['/home'])
  this.message='You have entered'
  }
}
}
