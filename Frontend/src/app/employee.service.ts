import { environment } from './../environments/environment';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`)
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee)
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee)
  }
  
  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId }`)
  }

}