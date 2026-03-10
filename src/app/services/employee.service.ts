import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private mockEmployees: Employee[] = [
        { id: 1, name: 'Alice Smith', role: 'Software Engineer', department: 'Engineering', salary: 120000, email: 'alice@example.com', joinDate: new Date('2022-01-15') },
        { id: 2, name: 'Bob Johnson', role: 'Product Manager', department: 'Product', salary: 135000, email: 'bob@example.com', joinDate: new Date('2021-06-10') },
        { id: 3, name: 'Charlie Brown', role: 'UX Designer', department: 'Design', salary: 95000, email: 'charlie@example.com', joinDate: new Date('2023-03-20') },
        { id: 4, name: 'Diana Prince', role: 'HR Manager', department: 'Human Resources', salary: 105000, email: 'diana@example.com', joinDate: new Date('2020-11-05') },
        { id: 5, name: 'Evan Wright', role: 'QA Engineer', department: 'Engineering', salary: 85000, email: 'evan@example.com', joinDate: new Date('2023-08-01') }
    ];

    private employeesSubject = new BehaviorSubject<Employee[]>(this.mockEmployees);
    public employees$ = this.employeesSubject.asObservable();

    constructor() { }

    getEmployees(): Observable<Employee[]> {
        return of(this.employeesSubject.value).pipe(delay(500)); // Simulate API network delay
    }

    getEmployee(id: number): Observable<Employee | undefined> {
        const emp = this.employeesSubject.value.find(e => e.id === id);
        return of(emp).pipe(delay(300));
    }

    addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
        const newEmployee: Employee = {
            ...employee,
            id: this.generateId()
        };
        const currentEmployees = this.employeesSubject.value;
        this.employeesSubject.next([...currentEmployees, newEmployee]);
        return of(newEmployee).pipe(delay(400));
    }

    updateEmployee(employee: Employee): Observable<Employee> {
        const currentEmployees = this.employeesSubject.value;
        const index = currentEmployees.findIndex(e => e.id === employee.id);
        if (index !== -1) {
            const updatedEmployees = [...currentEmployees];
            updatedEmployees[index] = employee;
            this.employeesSubject.next(updatedEmployees);
        }
        return of(employee).pipe(delay(400)); // Simulate API delay
    }

    deleteEmployee(id: number): Observable<boolean> {
        const currentEmployees = this.employeesSubject.value;
        this.employeesSubject.next(currentEmployees.filter(e => e.id !== id));
        return of(true).pipe(delay(300));
    }

    private generateId(): number {
        const employees = this.employeesSubject.value;
        return employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    }
}
