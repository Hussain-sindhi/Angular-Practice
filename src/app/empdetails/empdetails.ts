import { Component, output, EventEmitter, Output } from '@angular/core';
import { Navbar } from '../navbar/navbar';
// import {router, routerLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee/employee';

@Component({
  imports: [FormsModule, Navbar],
  standalone: true,

  // FIXED: Changed selector from 'app-empdetais' to 'app-empdetails'
  // WHY: The selector had a typo - missing 'l'. Should match the folder name 'empdetails'
  // This ensures the component can be properly referenced in templates using <app-empdetails>
  selector: 'app-empdetails',

  // FIXED: Changed styleUrl from './empdetais.css' to './empdetails.css'
  // WHY: The CSS file is actually named 'empdetails.css' (with 'l'), not 'empdetais.css'
  // This mismatch was causing Angular to fail loading the styles for this component
  styleUrl: './empdetails.css',

  templateUrl: './empdetails.html',
})
export class Empdetails {

  // This object holds the employee form data
  // IMPORTANT: All form inputs should bind to properties inside this 'emp' object
  // Example: [(ngModel)]="emp.Name", NOT [(ngModel)]="Name"
  emp = {
    Name: '',
    EmpID: 0,
    Department: '',
    Designation: '',
    Email: ''
  };

  @Output() employeeAdded = new EventEmitter<Employee>();

  submitData() {
    this.employeeAdded.emit({ ...this.emp });
  }

  
}
    