<<<<<<< HEAD
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { Employee, PerformanceMetrics } from '../../models/employee.model';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('departmentChart') departmentChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('trendChart') trendChartRef!: ElementRef<HTMLCanvasElement>;

  loading = true;
  metrics: PerformanceMetrics | null = null;
  topPerformers: Employee[] = [];
  displayedColumns: string[] = ['name', 'department', 'score', 'action'];

  private departmentChart: Chart | null = null;
  private trendChart: Chart | null = null;

  constructor(
    private employeeService: EmployeeService,
    private performanceService: PerformanceService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    if (this.metrics) {
      setTimeout(() => this.createCharts(), 0);
    }
  }

  loadDashboardData(): void {
    this.loading = true;

    this.performanceService.getPerformanceMetrics().subscribe({
      next: (metrics) => {
        this.metrics = metrics;
        this.loadTopPerformers();
      },
      error: (err) => {
        console.error('Error loading metrics:', err);
        this.loading = false;
      }
    });
  }

  loadTopPerformers(): void {
    this.employeeService.getTopPerformers(5).subscribe({
      next: (employees) => {
        this.topPerformers = employees;
        this.loading = false;
        setTimeout(() => this.createCharts(), 0);
      },
      error: (err) => {
        console.error('Error loading top performers:', err);
        this.loading = false;
      }
    });
  }

  createCharts(): void {
    if (!this.metrics) return;

    this.createDepartmentChart();
    this.createTrendChart();
  }

  createDepartmentChart(): void {
    if (!this.metrics || !this.departmentChartRef) return;

    if (this.departmentChart) {
      this.departmentChart.destroy();
    }

    const ctx = this.departmentChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.departmentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.metrics.departmentScores.map(d => d.department),
        datasets: [{
          label: 'Performance Score',
          data: this.metrics.departmentScores.map(d => d.score),
          backgroundColor: [
            'rgba(102, 126, 234, 0.8)',
            'rgba(118, 75, 162, 0.8)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(255, 193, 7, 0.8)',
            'rgba(244, 67, 54, 0.8)'
          ],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Performance by Department',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  createTrendChart(): void {
    if (!this.metrics || !this.trendChartRef) return;

    if (this.trendChart) {
      this.trendChart.destroy();
    }

    const ctx = this.trendChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.metrics.monthlyTrends.map(t => t.month),
        datasets: [{
          label: 'Average Performance',
          data: this.metrics.monthlyTrends.map(t => t.score),
          borderColor: 'rgb(102, 126, 234)',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: '6-Month Performance Trend',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 0.5
            }
          }
        }
      }
    });
  }

  getFullName(employee: Employee): string {
    return `${employee.firstName} ${employee.lastName}`;
  }
}
=======
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { Employee, PerformanceMetrics } from '../../models/employee.model';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('departmentChart') departmentChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('trendChart') trendChartRef!: ElementRef<HTMLCanvasElement>;

  loading = true;
  metrics: PerformanceMetrics | null = null;
  topPerformers: Employee[] = [];
  displayedColumns: string[] = ['name', 'department', 'score', 'action'];

  private departmentChart: Chart | null = null;
  private trendChart: Chart | null = null;

  constructor(
    private employeeService: EmployeeService,
    private performanceService: PerformanceService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    if (this.metrics) {
      setTimeout(() => this.createCharts(), 0);
    }
  }

  loadDashboardData(): void {
    this.loading = true;

    this.performanceService.getPerformanceMetrics().subscribe({
      next: (metrics) => {
        this.metrics = metrics;
        this.loadTopPerformers();
      },
      error: (err) => {
        console.error('Error loading metrics:', err);
        this.loading = false;
      }
    });
  }

  loadTopPerformers(): void {
    this.employeeService.getTopPerformers(5).subscribe({
      next: (employees) => {
        this.topPerformers = employees;
        this.loading = false;
        setTimeout(() => this.createCharts(), 0);
      },
      error: (err) => {
        console.error('Error loading top performers:', err);
        this.loading = false;
      }
    });
  }

  createCharts(): void {
    if (!this.metrics) return;

    this.createDepartmentChart();
    this.createTrendChart();
  }

  createDepartmentChart(): void {
    if (!this.metrics || !this.departmentChartRef) return;

    if (this.departmentChart) {
      this.departmentChart.destroy();
    }

    const ctx = this.departmentChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.departmentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.metrics.departmentScores.map(d => d.department),
        datasets: [{
          label: 'Performance Score',
          data: this.metrics.departmentScores.map(d => d.score),
          backgroundColor: [
            'rgba(102, 126, 234, 0.8)',
            'rgba(118, 75, 162, 0.8)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(255, 193, 7, 0.8)',
            'rgba(244, 67, 54, 0.8)'
          ],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Performance by Department',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  createTrendChart(): void {
    if (!this.metrics || !this.trendChartRef) return;

    if (this.trendChart) {
      this.trendChart.destroy();
    }

    const ctx = this.trendChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.metrics.monthlyTrends.map(t => t.month),
        datasets: [{
          label: 'Average Performance',
          data: this.metrics.monthlyTrends.map(t => t.score),
          borderColor: 'rgb(102, 126, 234)',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: '6-Month Performance Trend',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 0.5
            }
          }
        }
      }
    });
  }

  getFullName(employee: Employee): string {
    return `${employee.firstName} ${employee.lastName}`;
  }
}
>>>>>>> 6143766f5d839bcae2d6f2cf6f0d0b688d2e5ad6
