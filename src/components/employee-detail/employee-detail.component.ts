import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { Employee, PerformanceReview } from '../../models/employee.model';
import { PerformanceRatingPipe } from '../../pipes/performance-rating.pipe';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    PerformanceRatingPipe
  ],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  reviews: PerformanceReview[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private performanceService: PerformanceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployeeDetails(+id);
    } else {
      this.error = 'Invalid employee ID';
      this.loading = false;
    }
  }

  loadEmployeeDetails(id: number): void {
    this.loading = true;

    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.loadReviews(id);
      },
      error: (err) => {
        this.error = err.message || 'Employee not found';
        this.loading = false;
      }
    });
  }

  loadReviews(employeeId: number): void {
    this.performanceService.getReviewsByEmployeeId(employeeId).subscribe({
      next: (reviews) => {
        this.reviews = reviews.sort((a, b) =>
          new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.loading = false;
      }
    });
  }

  getFullName(): string {
    if (!this.employee) return '';
    return `${this.employee.firstName} ${this.employee.lastName}`;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'primary';
      case 'On Leave':
        return 'accent';
      case 'Inactive':
        return 'warn';
      default:
        return '';
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
