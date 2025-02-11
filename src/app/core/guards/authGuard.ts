// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionStorageService } from '../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../shared/models/session-items';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionStorageService = inject(SessionStorageService);
  const expectedRoles = route.data['expectedRoles'] as string[];
  const currentRole =
    typeof sessionStorage !== 'undefined'
      ? sessionStorageService.getItem(SESSION_ITEMS.ROLE)
      : null;
  if (currentRole && expectedRoles.includes(currentRole)) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
