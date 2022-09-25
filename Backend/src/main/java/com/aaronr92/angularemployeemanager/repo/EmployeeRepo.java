package com.aaronr92.angularemployeemanager.repo;

import com.aaronr92.angularemployeemanager.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    void deleteById(Long id);

    Optional<Employee> findEmployeeById(Long id);
}
