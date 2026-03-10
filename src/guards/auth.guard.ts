<<<<<<< HEAD
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && !authService.hasRole(requiredRoles)) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
=======
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && !authService.hasRole(requiredRoles)) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
>>>>>>> 6143766f5d839bcae2d6f2cf6f0d0b688d2e5ad6
