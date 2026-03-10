import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    // Simulate an auth guard that always returns true for now.
    // In a real application, you would inject an AuthService and determine access.
    console.log('Auth guard simulating route protection.');
    return true;
};
