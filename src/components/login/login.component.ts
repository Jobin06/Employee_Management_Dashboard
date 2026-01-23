import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';
  returnUrl = '/dashboard';

  demoAccounts = [
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'hr', password: 'hr123', role: 'HR' },
    { username: 'manager', password: 'manager123', role: 'Manager' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.error = 'Please enter username and password';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
        this.error = err.message || 'Invalid credentials. Please try again.';
        this.loading = false;
      }
    });
  }

  fillDemoCredentials(account: { username: string; password: string }): void {
    this.username = account.username;
    this.password = account.password;
  }
}
