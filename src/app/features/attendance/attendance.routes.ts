import { Routes } from '@angular/router';
import { RegisterAttendancePageComponent } from './pages/register-attendance-page/register-attendance-page.component';
import { UsersAttendancePageComponent } from './pages/users-attendance-page/users-attendance-page.component';
import { roleGuard } from '../../core/guards/authGuard';

export const ATTENDANCE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterAttendancePageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'supervisor', 'HHRR'],
    },
  },
  {
    path: 'users',
    component: UsersAttendancePageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['supervisor', 'HHRR'],
    },
  },
];
