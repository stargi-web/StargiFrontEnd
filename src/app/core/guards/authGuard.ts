// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const expectedRoles = route.data['expectedRoles'] as string[];
  const currentRole =
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('role')
      : null;
  if (currentRole && expectedRoles.includes(currentRole)) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
