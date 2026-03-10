import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
    employeeForm!: FormGroup;
    isEditMode = false;
    employeeId!: number;
    isLoading = false;
    departments = ['Engineering', 'Product', 'Design', 'Human Resources', 'Sales'];
    private routeSub!: Subscription;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private employeeService: EmployeeService,
        private snackBar: MatSnackBar
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.routeSub = this.route.paramMap.subscribe(params => {
            const idStr = params.get('id');
            if (idStr) {
                this.isEditMode = true;
                this.employeeId = parseInt(idStr, 10);
                this.loadEmployeeData(this.employeeId);
            }
        });
    }

    createForm() {
        this.employeeForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            department: ['', Validators.required],
            salary: ['', [Validators.required, Validators.min(0)]],
            joinDate: [new Date(), Validators.required]
        });
    }

    loadEmployeeData(id: number) {
        this.isLoading = true;
        this.employeeService.getEmployee(id).subscribe({
            next: (emp) => {
                if (emp) {
                    this.employeeForm.patchValue({
                        name: emp.name,
                        email: emp.email,
                        role: emp.role,
                        department: emp.department,
                        salary: emp.salary,
                        joinDate: emp.joinDate
                    });
                } else {
                    this.snackBar.open('Employee not found', 'Close', { duration: 3000 });
                    this.router.navigate(['/employees']);
                }
                this.isLoading = false;
            },
            error: () => {
                this.isLoading = false;
                this.snackBar.open('Error loading employee data', 'Close', { duration: 3000 });
            }
        });
    }

    onSubmit() {
        if (this.employeeForm.invalid) {
            this.employeeForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const formData = this.employeeForm.value;

        if (this.isEditMode) {
            const updatedEmployee = { ...formData, id: this.employeeId };
            this.employeeService.updateEmployee(updatedEmployee).subscribe({
                next: () => {
                    this.snackBar.open('Employee updated successfully', 'Close', { duration: 3000 });
                    this.isLoading = false;
                    this.router.navigate(['/employee', this.employeeId]);
                },
                error: () => {
                    this.isLoading = false;
                    this.snackBar.open('Error updating employee', 'Close', { duration: 3000 });
                }
            });
        } else {
            this.employeeService.addEmployee(formData).subscribe({
                next: (newEmp) => {
                    this.snackBar.open('Employee added successfully', 'Close', { duration: 3000 });
                    this.isLoading = false;
                    this.router.navigate(['/employee', newEmp.id]);
                },
                error: () => {
                    this.isLoading = false;
                    this.snackBar.open('Error adding employee', 'Close', { duration: 3000 });
                }
            });
        }
    }

    goBack() {
        this.location.back();
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }

    // Helper getters for template validation
    get f() { return this.employeeForm.controls; }
}
