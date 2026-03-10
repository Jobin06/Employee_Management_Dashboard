import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private mockEmployees: Employee[] = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      manager: 'John Smith',
      hireDate: '2020-03-15',
      profileImage: 'https://i.pravatar.cc/150?img=1',
      performanceScore: 4.8,
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@company.com',
      department: 'Engineering',
      position: 'Frontend Developer',
      manager: 'John Smith',
      hireDate: '2021-06-01',
      profileImage: 'https://i.pravatar.cc/150?img=2',
      performanceScore: 4.5,
      status: 'Active'
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      manager: 'Lisa Brown',
      hireDate: '2019-09-10',
      profileImage: 'https://i.pravatar.cc/150?img=3',
      performanceScore: 4.7,
      status: 'Active'
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      manager: 'Mark Taylor',
      hireDate: '2021-01-20',
      profileImage: 'https://i.pravatar.cc/150?img=4',
      performanceScore: 4.2,
      status: 'Active'
    },
    {
      id: 5,
      firstName: 'Jessica',
      lastName: 'Martinez',
      email: 'jessica.martinez@company.com',
      department: 'HR',
      position: 'HR Specialist',
      manager: 'Karen White',
      hireDate: '2020-11-05',
      profileImage: 'https://i.pravatar.cc/150?img=5',
      performanceScore: 4.6,
      status: 'Active'
    },
    {
      id: 6,
      firstName: 'Robert',
      lastName: 'Anderson',
      email: 'robert.anderson@company.com',
      department: 'Engineering',
      position: 'DevOps Engineer',
      manager: 'John Smith',
      hireDate: '2022-02-14',
      profileImage: 'https://i.pravatar.cc/150?img=6',
      performanceScore: 4.4,
      status: 'Active'
    },
    {
      id: 7,
      firstName: 'Amanda',
      lastName: 'Thompson',
      email: 'amanda.thompson@company.com',
      department: 'Marketing',
      position: 'Content Writer',
      manager: 'Lisa Brown',
      hireDate: '2021-08-22',
      profileImage: 'https://i.pravatar.cc/150?img=7',
      performanceScore: 3.9,
      status: 'Active'
    },
    {
      id: 8,
      firstName: 'James',
      lastName: 'Garcia',
      email: 'james.garcia@company.com',
      department: 'Sales',
      position: 'Sales Manager',
      manager: 'Mark Taylor',
      hireDate: '2018-05-30',
      profileImage: 'https://i.pravatar.cc/150?img=8',
      performanceScore: 4.9,
      status: 'Active'
    },
    {
      id: 9,
      firstName: 'Lisa',
      lastName: 'Rodriguez',
      email: 'lisa.rodriguez@company.com',
      department: 'Finance',
      position: 'Financial Analyst',
      manager: 'Richard Lee',
      hireDate: '2020-07-18',
      profileImage: 'https://i.pravatar.cc/150?img=9',
      performanceScore: 4.3,
      status: 'On Leave'
    },
    {
      id: 10,
      firstName: 'Christopher',
      lastName: 'Lee',
      email: 'christopher.lee@company.com',
      department: 'Engineering',
      position: 'Backend Developer',
      manager: 'John Smith',
      hireDate: '2021-04-12',
      profileImage: 'https://i.pravatar.cc/150?img=10',
      performanceScore: 4.1,
      status: 'Active'
    }
  ];

  getEmployees(): Observable<Employee[]> {
    return of(this.mockEmployees).pipe(delay(300));
  }

  getEmployeeById(id: number): Observable<Employee> {
    const employee = this.mockEmployees.find(e => e.id === id);
    if (employee) {
      return of(employee).pipe(delay(300));
    }
    return throwError(() => new Error('Employee not found'));
  }

  getDepartments(): Observable<string[]> {
    const departments = [...new Set(this.mockEmployees.map(e => e.department))];
    return of(departments);
  }

  getTopPerformers(limit: number = 5): Observable<Employee[]> {
    const sorted = [...this.mockEmployees]
      .sort((a, b) => b.performanceScore - a.performanceScore)
      .slice(0, limit);
    return of(sorted).pipe(delay(300));
  }
}
