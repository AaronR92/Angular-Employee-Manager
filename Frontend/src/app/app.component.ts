import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees!: Employee[];
  public editEmployee?: Employee; 
  public deleteEmployee?: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        console.log(response);
        
        this.employees = response;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById("add-employee-form")!.click();

    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
        addForm.reset();
      }
    });
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (response: void) => {
        this.getEmployees();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  public searchEmployee(key: string) {
    const results: Employee[] = [];

    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    if (!key) {
      this.getEmployees();
    } else {
      this.employees = results;
    }
  }

  public onOpenModal(mode: string, employee?: Employee): void {
    const button = document.createElement("button");
    const container = document.getElementById("main-container");

    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");

    if (mode === "add") {
      button.setAttribute("data-target", "#addEmployeeModal");
    } else if (mode === "edit") {
      this.editEmployee = employee;
      button.setAttribute("data-target", "#updateEmployeeModal");
    } else if (mode ==="delete") {
      this.deleteEmployee = employee;
      button.setAttribute("data-target", "#deleteEmployeeModal")
    }

    container!.appendChild(button);
    button.click();
  }

  public onUpdateEmployee(employee: Employee): void {
      this.employeeService.updateEmployee(employee).subscribe({
        next: (response) => {

          this.getEmployees();
        },
        error: (err) => {
          alert(err.message);
        }
      });
  }
}