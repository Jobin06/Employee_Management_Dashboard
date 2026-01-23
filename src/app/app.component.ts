import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { User } from '../models/employee.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User | null = null;
  isLoginPage = false;

  navigationItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'people', label: 'Employees', route: '/employees' }
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLoginPage = event.url === '/login';
    });
  }

  ngOnInit(): void {
    this.isLoginPage = this.router.url === '/login';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
