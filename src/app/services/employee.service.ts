import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';

export interface EmployeeItem {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
  salary: number;
  joiningDate?: string;
  phone?: string;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${API_BASE_URL}/employees`;

  constructor(private http: HttpClient) {}

  getAllEmployees(page: number = 1, limit: number = 50, department?: string): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    if (department) {
      url += `&department=${encodeURIComponent(department)}`;
    }
    return this.http.get<any>(url);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: EmployeeItem): Observable<any> {
    const payload = {
      ...employee,
      joiningDate: employee.joiningDate || new Date().toISOString().split('T')[0],
      salary: Number(employee.salary),
    };
    return this.http.post<any>(this.apiUrl, payload);
  }

  updateEmployee(id: number, employee: Partial<EmployeeItem>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
