package com.aaronr92.angularemployeemanager.controller;

import com.aaronr92.angularemployeemanager.entity.Employee;
import com.aaronr92.angularemployeemanager.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/all")
    ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok().body(employeeService.getAllEmployees());
    }

    @GetMapping("/find/{id}")
    ResponseEntity<Employee> getAllEmployees(@PathVariable Long id) {
        return ResponseEntity.ok().body(employeeService.findEmployeeById(id));
    }

    @PostMapping("/add")
    ResponseEntity<Employee> addEmployee(@RequestBody @Valid Employee employee) {
        URI uri = URI.create(ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/employee/add")
                .toUriString());
        return ResponseEntity.created(uri).body(employeeService.addEmployee(employee));
    }

    @PutMapping("/update")
    ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok().body(employeeService.updateEmployee(employee));
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

}
