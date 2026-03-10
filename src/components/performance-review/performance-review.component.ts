<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { AuthService } from '../../services/auth.service';
import { Employee, PerformanceReview } from '../../models/employee.model';

@Component({
  selector: 'app-performance-review',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.css']
})
export class PerformanceReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  employee: Employee | null = null;
  loading = true;
  submitting = false;
  newGoal = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private performanceService: PerformanceService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(+id);
    } else {
      this.loading = false;
    }
  }

  initializeForm(): void {
    this.reviewForm = this.fb.group({
      period: ['', Validators.required],
      technicalSkills: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      communication: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      teamwork: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      leadership: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      productivity: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      comments: ['', [Validators.required, Validators.minLength(20)]],
      goals: this.fb.array([])
    });
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employee:', err);
        this.snackBar.open('Employee not found', 'Close', { duration: 3000 });
        this.router.navigate(['/employees']);
      }
    });
  }

  get goals(): FormArray {
    return this.reviewForm.get('goals') as FormArray;
  }

  addGoal(): void {
    if (this.newGoal.trim()) {
      this.goals.push(this.fb.control(this.newGoal.trim()));
      this.newGoal = '';
    }
  }

  removeGoal(index: number): void {
    this.goals.removeAt(index);
  }

  calculateOverallRating(): number {
    const technical = this.reviewForm.get('technicalSkills')?.value || 0;
    const communication = this.reviewForm.get('communication')?.value || 0;
    const teamwork = this.reviewForm.get('teamwork')?.value || 0;
    const leadership = this.reviewForm.get('leadership')?.value || 0;
    const productivity = this.reviewForm.get('productivity')?.value || 0;

    return (technical + communication + teamwork + leadership + productivity) / 5;
  }

  onSubmit(): void {
    if (this.reviewForm.invalid || !this.employee) {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.submitting = true;
    const currentUser = this.authService.currentUserValue;

    const review: Omit<PerformanceReview, 'id'> = {
      employeeId: this.employee.id,
      reviewerId: currentUser?.id || 0,
      reviewerName: currentUser?.name || 'Unknown',
      reviewDate: new Date().toISOString().split('T')[0],
      period: this.reviewForm.value.period,
      overallRating: this.calculateOverallRating(),
      technicalSkills: this.reviewForm.value.technicalSkills,
      communication: this.reviewForm.value.communication,
      teamwork: this.reviewForm.value.teamwork,
      leadership: this.reviewForm.value.leadership,
      productivity: this.reviewForm.value.productivity,
      comments: this.reviewForm.value.comments,
      goals: this.reviewForm.value.goals,
      status: 'Completed'
    };

    this.performanceService.submitReview(review).subscribe({
      next: () => {
        this.snackBar.open('Review submitted successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/employees', this.employee!.id]);
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        this.snackBar.open('Error submitting review. Please try again.', 'Close', { duration: 3000 });
        this.submitting = false;
      }
    });
  }

  cancel(): void {
    if (this.employee) {
      this.router.navigate(['/employees', this.employee.id]);
    } else {
      this.router.navigate(['/employees']);
    }
  }

  getFullName(): string {
    if (!this.employee) return '';
    return `${this.employee.firstName} ${this.employee.lastName}`;
  }

  formatSliderValue(value: number): string {
    return value.toFixed(1);
  }
}
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { AuthService } from '../../services/auth.service';
import { Employee, PerformanceReview } from '../../models/employee.model';

@Component({
  selector: 'app-performance-review',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.css']
})
export class PerformanceReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  employee: Employee | null = null;
  loading = true;
  submitting = false;
  newGoal = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private performanceService: PerformanceService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(+id);
    } else {
      this.loading = false;
    }
  }

  initializeForm(): void {
    this.reviewForm = this.fb.group({
      period: ['', Validators.required],
      technicalSkills: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      communication: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      teamwork: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      leadership: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      productivity: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      comments: ['', [Validators.required, Validators.minLength(20)]],
      goals: this.fb.array([])
    });
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employee:', err);
        this.snackBar.open('Employee not found', 'Close', { duration: 3000 });
        this.router.navigate(['/employees']);
      }
    });
  }

  get goals(): FormArray {
    return this.reviewForm.get('goals') as FormArray;
  }

  addGoal(): void {
    if (this.newGoal.trim()) {
      this.goals.push(this.fb.control(this.newGoal.trim()));
      this.newGoal = '';
    }
  }

  removeGoal(index: number): void {
    this.goals.removeAt(index);
  }

  calculateOverallRating(): number {
    const technical = this.reviewForm.get('technicalSkills')?.value || 0;
    const communication = this.reviewForm.get('communication')?.value || 0;
    const teamwork = this.reviewForm.get('teamwork')?.value || 0;
    const leadership = this.reviewForm.get('leadership')?.value || 0;
    const productivity = this.reviewForm.get('productivity')?.value || 0;

    return (technical + communication + teamwork + leadership + productivity) / 5;
  }

  onSubmit(): void {
    if (this.reviewForm.invalid || !this.employee) {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.submitting = true;
    const currentUser = this.authService.currentUserValue;

    const review: Omit<PerformanceReview, 'id'> = {
      employeeId: this.employee.id,
      reviewerId: currentUser?.id || 0,
      reviewerName: currentUser?.name || 'Unknown',
      reviewDate: new Date().toISOString().split('T')[0],
      period: this.reviewForm.value.period,
      overallRating: this.calculateOverallRating(),
      technicalSkills: this.reviewForm.value.technicalSkills,
      communication: this.reviewForm.value.communication,
      teamwork: this.reviewForm.value.teamwork,
      leadership: this.reviewForm.value.leadership,
      productivity: this.reviewForm.value.productivity,
      comments: this.reviewForm.value.comments,
      goals: this.reviewForm.value.goals,
      status: 'Completed'
    };

    this.performanceService.submitReview(review).subscribe({
      next: () => {
        this.snackBar.open('Review submitted successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/employees', this.employee!.id]);
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        this.snackBar.open('Error submitting review. Please try again.', 'Close', { duration: 3000 });
        this.submitting = false;
      }
    });
  }

  cancel(): void {
    if (this.employee) {
      this.router.navigate(['/employees', this.employee.id]);
    } else {
      this.router.navigate(['/employees']);
    }
  }

  getFullName(): string {
    if (!this.employee) return '';
    return `${this.employee.firstName} ${this.employee.lastName}`;
  }

  formatSliderValue(value: number): string {
    return value.toFixed(1);
  }
}
>>>>>>> 6143766f5d839bcae2d6f2cf6f0d0b688d2e5ad6
