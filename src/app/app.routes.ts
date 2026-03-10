import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'add-employee', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: 'edit-employee/:id', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: 'employee/:id', component: EmployeeDetailComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: '**', redirectTo: '/employees' }
];
