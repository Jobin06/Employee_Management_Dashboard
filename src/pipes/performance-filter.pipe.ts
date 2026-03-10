<<<<<<< HEAD
import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'performanceFilter',
  standalone: true
})
export class PerformanceFilterPipe implements PipeTransform {
  transform(employees: Employee[], searchTerm: string, department: string): Employee[] {
    if (!employees) {
      return [];
    }

    let filtered = employees;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term)
      );
    }

    if (department && department !== 'All') {
      filtered = filtered.filter(emp => emp.department === department);
    }

    return filtered;
  }
}
=======
import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'performanceFilter',
  standalone: true
})
export class PerformanceFilterPipe implements PipeTransform {
  transform(employees: Employee[], searchTerm: string, department: string): Employee[] {
    if (!employees) {
      return [];
    }

    let filtered = employees;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term)
      );
    }

    if (department && department !== 'All') {
      filtered = filtered.filter(emp => emp.department === department);
    }

    return filtered;
  }
}
>>>>>>> 6143766f5d839bcae2d6f2cf6f0d0b688d2e5ad6
