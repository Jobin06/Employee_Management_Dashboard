import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { HighlightSalaryDirective } from '../../directives/highlight-salary.directive';

@Component({
    selector: 'app-employee-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatChipsModule,
        HighlightSalaryDirective
    ],
    templateUrl: './employee-detail.component.html',
    styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
    employee: Employee | undefined;
    isLoading = true;
    employeeNotFound = false;
    private routeSub!: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private employeeService: EmployeeService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.routeSub = this.route.paramMap.subscribe(params => {
            const idStr = params.get('id');
            if (idStr) {
                const id = parseInt(idStr, 10);
                this.fetchEmployee(id);
            } else {
                this.employeeNotFound = true;
                this.isLoading = false;
            }
        });
    }

    fetchEmployee(id: number) {
        this.isLoading = true;
        this.employeeNotFound = false;
        this.cdr.detectChanges();

        this.employeeService.getEmployee(id).subscribe({
            next: (emp) => {
                this.employee = emp;
                this.isLoading = false;
                if (!emp) {
                    this.employeeNotFound = true;
                }
                this.cdr.detectChanges();
            },
            error: () => {
                this.isLoading = false;
                this.employeeNotFound = true;
                this.cdr.detectChanges();
            }
        });
    }

    goBack() {
        this.location.back();
    }

    editEmployee() {
        if (this.employee) {
            this.router.navigate(['/edit-employee', this.employee.id]);
        }
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }
}
