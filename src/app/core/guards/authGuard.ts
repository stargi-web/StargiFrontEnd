// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
    const router = new Router();
    const expectedRoles = route.data['expectedRoles'] as string[];
    const currentRole = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('role') : null;
    if (currentRole&&expectedRoles.includes(currentRole)) {
        return true;
    }
        return false;
};
