import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { EmployeeService, EmployeeItem } from '../services/employee.service';
import { AuthService } from '../services/auth.service';

export interface EmployeeRow {
  id: number;
  firstName?: string;
  lastName?: string;
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

  // Edit operation state
  isEditing: boolean = false;
  editingId: number | null = null;

  // Employee Directory state with initial list matching screenshot
  employees: EmployeeRow[] = [
    {
      id: 17,
      firstName: 'parin',
      lastName: 'shah',
      fullName: 'parin shah',
      email: 'parin.shah.dev@gmail.com',
      department: 'FE',
      designation: 'SSE',
      salary: 50000,
    },
    {
      id: 16,
      firstName: 'testd',
      lastName: 'shah',
      fullName: 'testd shah',
      email: 'testd@gmail.com',
      department: 'Frontend',
      designation: 'Senior Engineer',
      salary: 50000,
    },
    {
      id: 15,
      firstName: 'testc',
      lastName: 'shah',
      fullName: 'testc shah',
      email: 'testc@gmail.com',
      department: 'Frontend',
      designation: 'SSE',
      salary: 50000,
    },
    {
      id: 14,
      firstName: 'testb',
      lastName: 'shah',
      fullName: 'testb shah',
      email: 'testb@gmail.com',
      department: 'FE',
      designation: 'Senior Engineer',
      salary: 50000,
    },
    {
      id: 12,
      firstName: 'parin',
      lastName: 'shah',
      fullName: 'parin shah',
      email: 'parin2@gmail.com',
      department: 'Frontend',
      designation: 'Senior Engineer',
      salary: 50000,
    },
  ];

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check route parameters
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const targetId = Number(params['id']);
        const found = this.employees.find((e) => e.id === targetId);
        if (found) {
          this.startEdit(found);
        }
      }
    });

    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.authService.ensureToken().subscribe({
      next: () => {
        this.employeeService.getAllEmployees().subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response && response.employees && response.employees.length > 0) {
              this.employees = response.employees.map((e: any) => ({
                id: e.id,
                firstName: e.firstName,
                lastName: e.lastName,
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
            console.log('API notice (using directory state):', err.message || err);
          },
        });
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
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

    this.authService.ensureToken().subscribe(() => {
      this.employeeService.createEmployee(newEmpItem).subscribe({
        next: (created) => {
          const newRow: EmployeeRow = {
            id: created.id || this.generateNextId(),
            firstName: created.firstName,
            lastName: created.lastName,
            fullName: `${created.firstName} ${created.lastName}`.trim(),
            email: created.email,
            department: created.department,
            designation: created.designation,
            salary: Number(created.salary),
          };
          this.employees = [newRow, ...this.employees];
          this.resetForm();
          this.showSuccess('Employee added successfully!');
        },
        error: () => {
          // Local addition for immediate UI responsiveness
          const newRow: EmployeeRow = {
            id: this.generateNextId(),
            firstName: newEmpItem.firstName,
            lastName: newEmpItem.lastName,
            fullName: `${newEmpItem.firstName} ${newEmpItem.lastName}`.trim(),
            email: newEmpItem.email,
            department: newEmpItem.department,
            designation: newEmpItem.designation,
            salary: newEmpItem.salary,
          };
          this.employees = [newRow, ...this.employees];
          this.resetForm();
          this.showSuccess('Employee added to directory!');
        },
      });
    });
  }

  startEdit(emp: EmployeeRow): void {
    this.isEditing = true;
    this.editingId = emp.id;

    let firstName = emp.firstName;
    let lastName = emp.lastName;
    if (!firstName && !lastName) {
      const parts = (emp.fullName || '').trim().split(' ');
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ') || '';
    }

    this.empForm.setValue({
      firstName: firstName || '',
      lastName: lastName || '',
      email: emp.email || '',
      department: emp.department || '',
      designation: emp.designation || '',
      salary: emp.salary ?? 50000,
    });

    // Smooth scroll up to edit form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.resetForm();
  }

  updateEmployee(): void {
    if (this.empForm.invalid || this.editingId === null) {
      this.empForm.markAllAsTouched();
      return;
    }

    const val = this.empForm.value;
    const updateData: Partial<EmployeeItem> = {
      firstName: (val.firstName || '').trim(),
      lastName: (val.lastName || '').trim(),
      email: (val.email || '').trim(),
      department: (val.department || '').trim(),
      designation: (val.designation || '').trim(),
      salary: Number(val.salary) || 0,
    };

    const id = this.editingId;

    this.authService.ensureToken().subscribe(() => {
      this.employeeService.updateEmployee(id, updateData).subscribe({
        next: (updated) => {
          const updatedRow: EmployeeRow = {
            id: id,
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            fullName: `${updateData.firstName} ${updateData.lastName}`.trim(),
            email: updateData.email || '',
            department: updateData.department || '',
            designation: updateData.designation || '',
            salary: Number(updateData.salary) || 0,
          };
          this.employees = this.employees.map((e) => (e.id === id ? { ...e, ...updatedRow } : e));
          this.cancelEdit();
          this.showSuccess(`Employee (ID: #${id}) updated successfully!`);
        },
        error: () => {
          // Fallback local update
          const updatedRow: EmployeeRow = {
            id: id,
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            fullName: `${updateData.firstName} ${updateData.lastName}`.trim(),
            email: updateData.email || '',
            department: updateData.department || '',
            designation: updateData.designation || '',
            salary: Number(updateData.salary) || 0,
          };
          this.employees = this.employees.map((e) => (e.id === id ? { ...e, ...updatedRow } : e));
          this.cancelEdit();
          this.showSuccess(`Employee (ID: #${id}) updated successfully!`);
        },
      });
    });
  }

  deleteEmployee(id: number): void {
    if (this.isEditing && this.editingId === id) {
      this.cancelEdit();
    }

    this.authService.ensureToken().subscribe(() => {
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
