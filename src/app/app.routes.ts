import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from '../components/employee-detail/employee-detail.component';
import { PerformanceReviewComponent } from '../components/performance-review/performance-review.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'review/:id',
    component: PerformanceReviewComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin', 'HR', 'Manager'] }
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
