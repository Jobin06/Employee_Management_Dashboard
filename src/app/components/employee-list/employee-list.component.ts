import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentFilterPipe } from '../../pipes/department-filter.pipe';
import { HighlightSalaryDirective } from '../../directives/highlight-salary.directive';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        DepartmentFilterPipe,
        HighlightSalaryDirective
    ],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['name', 'role', 'department', 'salary', 'actions'];
    dataSource!: MatTableDataSource<Employee>;
    originalData: Employee[] = [];

    departments: string[] = ['All', 'Engineering', 'Product', 'Design', 'Human Resources'];
    selectedDepartment: string = 'All';
    isLoading = true;

    private subscription: Subscription = new Subscription();
    private filterPipe = new DepartmentFilterPipe();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private employeeService: EmployeeService, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.subscription.add(
            this.employeeService.getEmployees().subscribe({
                next: (employees) => {
                    this.originalData = employees;
                    this.updateDataSource();
                    this.isLoading = false;
                },
                error: (err) => {
                    this.snackBar.open('Error fetching employees', 'Close', { duration: 3000 });
                    this.isLoading = false;
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        if (this.dataSource) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        }
    }

    onDepartmentChange(value: string) {
        this.selectedDepartment = value;
        this.updateDataSource();
    }

    updateDataSource() {
        const filteredEmployees = this.filterPipe.transform(this.originalData, this.selectedDepartment);

        if (this.dataSource) {
            this.dataSource.data = filteredEmployees;
        } else {
            this.dataSource = new MatTableDataSource<Employee>(filteredEmployees);
            setTimeout(() => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                // set filter predicate here if needed to filter across all columns by string
                this.dataSource.filterPredicate = (data: Employee, filter: string) => {
                    const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
                        return currentTerm + (data as any)[key] + '◬';
                    }, '').toLowerCase();
                    const transformedFilter = filter.trim().toLowerCase();
                    return dataStr.indexOf(transformedFilter) != -1;
                };
            });
        }
    }

    deleteEmployee(id: number, event: Event) {
        event.stopPropagation();
        if (confirm('Are you sure you want to delete this employee?')) {
            this.isLoading = true;
            this.employeeService.deleteEmployee(id).subscribe(() => {
                this.snackBar.open('Employee deleted successfully', 'Close', { duration: 3000 });
                // Refresh the dataset locally instead of resubscribing to avoid infinite loop of observable
                this.originalData = this.originalData.filter(e => e.id !== id);
                this.updateDataSource();
                this.isLoading = false;
            });
        }
    }
}
