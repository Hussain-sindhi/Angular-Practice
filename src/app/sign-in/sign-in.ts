import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-sign-in',
  styleUrl: './sign-in.css',
  templateUrl: './sign-in.html',
})
export class SignIn {

  passValidatorNot(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === 'password' || value === '12345678') {
      return { weakPass: true };
    }
    return null;
  }

  regForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      this.passValidatorNot.bind(this)
    ]), 
  });

  done() {
    if (this.regForm.valid) {
      console.log('userData-->', this.regForm.value);
      this.regForm.reset();
    } else {
      this.regForm.markAllAsTouched();
    }
  }
}
