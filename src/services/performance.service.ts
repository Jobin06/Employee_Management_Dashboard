<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PerformanceReview, PerformanceMetrics } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private mockReviews: PerformanceReview[] = [
    {
      id: 1,
      employeeId: 1,
      reviewerId: 2,
      reviewerName: 'John Smith',
      reviewDate: '2024-01-15',
      period: 'Q4 2023',
      overallRating: 4.8,
      technicalSkills: 5,
      communication: 4.5,
      teamwork: 5,
      leadership: 4.5,
      productivity: 5,
      comments: 'Exceptional performance. Consistently delivers high-quality work and mentors junior team members.',
      goals: ['Lead architecture for new microservice', 'Mentor 2 junior developers', 'Complete AWS certification'],
      status: 'Completed'
    },
    {
      id: 2,
      employeeId: 2,
      reviewerId: 2,
      reviewerName: 'John Smith',
      reviewDate: '2024-01-20',
      period: 'Q4 2023',
      overallRating: 4.5,
      technicalSkills: 4.5,
      communication: 4,
      teamwork: 5,
      leadership: 4,
      productivity: 5,
      comments: 'Strong technical skills with great attention to detail. Excellent team player.',
      goals: ['Improve React performance optimization', 'Learn TypeScript advanced patterns', 'Lead a small project'],
      status: 'Completed'
    },
    {
      id: 3,
      employeeId: 3,
      reviewerId: 3,
      reviewerName: 'Lisa Brown',
      reviewDate: '2024-01-18',
      period: 'Q4 2023',
      overallRating: 4.7,
      technicalSkills: 4.5,
      communication: 5,
      teamwork: 4.5,
      leadership: 5,
      productivity: 4.5,
      comments: 'Outstanding leadership in campaign management. Successfully launched 3 major initiatives.',
      goals: ['Expand digital marketing strategy', 'Increase social media engagement by 30%', 'Train new team member'],
      status: 'Completed'
    },
    {
      id: 4,
      employeeId: 1,
      reviewerId: 2,
      reviewerName: 'John Smith',
      reviewDate: '2023-07-15',
      period: 'Q2 2023',
      overallRating: 4.6,
      technicalSkills: 5,
      communication: 4,
      teamwork: 4.5,
      leadership: 4.5,
      productivity: 5,
      comments: 'Continues to show excellent technical leadership and delivery.',
      goals: ['Complete system migration', 'Improve code review process', 'Document best practices'],
      status: 'Completed'
    },
    {
      id: 5,
      employeeId: 8,
      reviewerId: 4,
      reviewerName: 'Mark Taylor',
      reviewDate: '2024-01-10',
      period: 'Q4 2023',
      overallRating: 4.9,
      technicalSkills: 4.5,
      communication: 5,
      teamwork: 5,
      leadership: 5,
      productivity: 5,
      comments: 'Exceeded all sales targets. Exceptional leadership and team development.',
      goals: ['Expand into new market segments', 'Mentor sales team', 'Achieve 120% of quota'],
      status: 'Completed'
    }
  ];

  private nextReviewId = 6;

  getReviewsByEmployeeId(employeeId: number): Observable<PerformanceReview[]> {
    const reviews = this.mockReviews.filter(r => r.employeeId === employeeId);
    return of(reviews).pipe(delay(300));
  }

  getAllReviews(): Observable<PerformanceReview[]> {
    return of(this.mockReviews).pipe(delay(300));
  }

  submitReview(review: Omit<PerformanceReview, 'id'>): Observable<PerformanceReview> {
    const newReview: PerformanceReview = {
      ...review,
      id: this.nextReviewId++
    };
    this.mockReviews.push(newReview);
    return of(newReview).pipe(delay(500));
  }

  getPerformanceMetrics(): Observable<PerformanceMetrics> {
    const metrics: PerformanceMetrics = {
      averageScore: 4.44,
      totalEmployees: 10,
      topPerformers: 4,
      needsImprovement: 2,
      departmentScores: [
        { department: 'Engineering', score: 4.45 },
        { department: 'Marketing', score: 4.3 },
        { department: 'Sales', score: 4.55 },
        { department: 'HR', score: 4.6 },
        { department: 'Finance', score: 4.3 }
      ],
      monthlyTrends: [
        { month: 'Jul', score: 4.2 },
        { month: 'Aug', score: 4.3 },
        { month: 'Sep', score: 4.35 },
        { month: 'Oct', score: 4.4 },
        { month: 'Nov', score: 4.42 },
        { month: 'Dec', score: 4.44 }
      ]
    };
    return of(metrics).pipe(delay(300));
  }
}
=======
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PerformanceReview, PerformanceMetrics } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private mockReviews: PerformanceReview[] = [
    {
      id: 1,
      employeeId: 1,
      reviewerId: 2,
      reviewerName: 'John Smith',
      reviewDate: '2024-01-15',
      period: 'Q4 2023',
      overallRating: 4.8,
      technicalSkills: 5,
      communication: 4.5,
      teamwork: 5,
      leadership: 4.5,
      productivity: 5,
      comments: 'Exceptional performance. Consistently delivers high-quality work and mentors junior team members.',
      goals: ['Lead architecture for new microservice', 'Mentor 2 junior developers', 'Complete AWS certification'],
      status: 'Completed'
    },
    {
      id: 2,
      employeeId: 2,
      reviewerId: 2,
      reviewerName: 'John Smith',
      reviewDate: '2024-01-20',
      period: 'Q4 2023',
      overallRating: 4.5,
      technicalSkills: 4.5,
      communication: 4,
      teamwork: 5,
      leadership: 4,
      productivity: 5,
      comments: 'Strong technical skills with great attention to detail. Excellent team player.',
      goals: ['Improve React performance optimization', 'Learn TypeScript advanced patterns', 'Lead a small project'],
      status: 'Completed'
    },
    {
      id: 3,
      employeeId: 3,
      reviewerId: 3,
      reviewerName: 'Lisa Brown',
      reviewDate: '2024-01-18',
      period: 'Q4 2023',
      overallRating: 4.7,
      technicalSkills: 4.5,
      communication: 5,
      teamwork: 4.5,
      leadership: 5,
      productivity: 4.5,
      comments: 'Outstanding leadership in campaign management. Successfully launched 3 major initiatives.',
      goals: ['Expand digital marketing strategy', 'Increase social media engagement by 30%', 'Train new team member'],
      status: 'Completed'
    },
    {
      id: 4,
      employeeId: 1,
      reviewerId: 2,
      reviewerName: 'John Smith',
      reviewDate: '2023-07-15',
      period: 'Q2 2023',
      overallRating: 4.6,
      technicalSkills: 5,
      communication: 4,
      teamwork: 4.5,
      leadership: 4.5,
      productivity: 5,
      comments: 'Continues to show excellent technical leadership and delivery.',
      goals: ['Complete system migration', 'Improve code review process', 'Document best practices'],
      status: 'Completed'
    },
    {
      id: 5,
      employeeId: 8,
      reviewerId: 4,
      reviewerName: 'Mark Taylor',
      reviewDate: '2024-01-10',
      period: 'Q4 2023',
      overallRating: 4.9,
      technicalSkills: 4.5,
      communication: 5,
      teamwork: 5,
      leadership: 5,
      productivity: 5,
      comments: 'Exceeded all sales targets. Exceptional leadership and team development.',
      goals: ['Expand into new market segments', 'Mentor sales team', 'Achieve 120% of quota'],
      status: 'Completed'
    }
  ];

  private nextReviewId = 6;

  getReviewsByEmployeeId(employeeId: number): Observable<PerformanceReview[]> {
    const reviews = this.mockReviews.filter(r => r.employeeId === employeeId);
    return of(reviews).pipe(delay(300));
  }

  getAllReviews(): Observable<PerformanceReview[]> {
    return of(this.mockReviews).pipe(delay(300));
  }

  submitReview(review: Omit<PerformanceReview, 'id'>): Observable<PerformanceReview> {
    const newReview: PerformanceReview = {
      ...review,
      id: this.nextReviewId++
    };
    this.mockReviews.push(newReview);
    return of(newReview).pipe(delay(500));
  }

  getPerformanceMetrics(): Observable<PerformanceMetrics> {
    const metrics: PerformanceMetrics = {
      averageScore: 4.44,
      totalEmployees: 10,
      topPerformers: 4,
      needsImprovement: 2,
      departmentScores: [
        { department: 'Engineering', score: 4.45 },
        { department: 'Marketing', score: 4.3 },
        { department: 'Sales', score: 4.55 },
        { department: 'HR', score: 4.6 },
        { department: 'Finance', score: 4.3 }
      ],
      monthlyTrends: [
        { month: 'Jul', score: 4.2 },
        { month: 'Aug', score: 4.3 },
        { month: 'Sep', score: 4.35 },
        { month: 'Oct', score: 4.4 },
        { month: 'Nov', score: 4.42 },
        { month: 'Dec', score: 4.44 }
      ]
    };
    return of(metrics).pipe(delay(300));
  }
}
>>>>>>> 6143766f5d839bcae2d6f2cf6f0d0b688d2e5ad6
