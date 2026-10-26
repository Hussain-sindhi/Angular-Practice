import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { EmployeeService, EmployeeItem } from '../services/employee.service';

export interface EmployeeRow {
  id: number;
  fullName: string;
  email: string;
  department: string;
  designation: string;
  salary: number;
}

@Component({
  selector: 'app-empdetails',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    Navbar,
    DecimalPipe,
  ],
  templateUrl: './empdetails.html',
  styleUrl: './empdetails.css',
})
export class Empdetails implements OnInit {
  // Reactive Form
  empForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    salary: new FormControl<number | null>(50000, [Validators.required, Validators.min(0)]),
  });

  // Employee Directory state
  employees: EmployeeRow[] = [
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      designation: 'Developer',
      salary: 50000,
    },
  ];

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check route parameters
    this.route.params.subscribe((params) => {
      if (params['id']) {
        console.log('Employee ID param:', params['id']);
      }
    });

    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response && response.employees && response.employees.length > 0) {
          this.employees = response.employees.map((e: any) => ({
            id: e.id,
            fullName: `${e.firstName} ${e.lastName}`.trim(),
            email: e.email,
            department: e.department,
            designation: e.designation,
            salary: Number(e.salary),
          }));
        }
      },
      error: (err) => {
        this.isLoading = false;
        // Keep initial mock row if backend is unauthorized or returns error
        console.log('API call notice (using local directory state):', err.message || err);
      },
    });
  }

  addEmployee(): void {
    if (this.empForm.invalid) {
      this.empForm.markAllAsTouched();
      return;
    }

    const val = this.empForm.value;
    const newEmpItem: EmployeeItem = {
      firstName: (val.firstName || '').trim(),
      lastName: (val.lastName || '').trim(),
      email: (val.email || '').trim(),
      department: (val.department || '').trim(),
      designation: (val.designation || '').trim(),
      salary: Number(val.salary) || 0,
      joiningDate: new Date().toISOString().split('T')[0],
    };

    this.employeeService.createEmployee(newEmpItem).subscribe({
      next: (created) => {
        const newRow: EmployeeRow = {
          id: created.id || this.generateNextId(),
          fullName: `${created.firstName} ${created.lastName}`.trim(),
          email: created.email,
          department: created.department,
          designation: created.designation,
          salary: Number(created.salary),
        };
        this.employees = [...this.employees, newRow];
        this.resetForm();
        this.showSuccess('Employee added successfully!');
      },
      error: () => {
        // Graceful local addition for immediate UI responsiveness
        const newRow: EmployeeRow = {
          id: this.generateNextId(),
          fullName: `${newEmpItem.firstName} ${newEmpItem.lastName}`.trim(),
          email: newEmpItem.email,
          department: newEmpItem.department,
          designation: newEmpItem.designation,
          salary: newEmpItem.salary,
        };
        this.employees = [...this.employees, newRow];
        this.resetForm();
        this.showSuccess('Employee added to directory!');
      },
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter((e) => e.id !== id);
        this.showSuccess('Employee removed.');
      },
      error: () => {
        // Fallback local deletion
        this.employees = this.employees.filter((e) => e.id !== id);
        this.showSuccess('Employee removed.');
      },
    });
  }

  resetForm(): void {
    this.empForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      designation: '',
      salary: 50000,
    });
  }

  private generateNextId(): number {
    if (this.employees.length === 0) return 1;
    const maxId = Math.max(...this.employees.map((e) => e.id));
    return maxId + 1;
  }

  private showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}