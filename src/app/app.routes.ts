import { Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { roleGuard } from './core/guards/authGuard';
import { UnauthorizedPageComponent } from './shared/pages/unauthorized-page/unauthorized-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'unauthorized', component: UnauthorizedPageComponent },

  {
    path: 'files',
    canActivate: [roleGuard],
    data: {
      expectedRoles: [
        'executive',
        'executivegpon',
        'supervisor',
        'admin',
        'HHRR',
      ],
    },
    loadComponent: () =>
      import(
        './features/file-manager/pages/file-storage/file-storage.component'
      ).then((m) => m.FileStorageComponent),
    loadChildren: () =>
      import('./features/file-manager/files.routes').then(
        (m) => m.FILE_MANAGER_ROUTES
      ),
  },

  {
    path: 'opportunities',
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'executivegpon', 'supervisor', 'admin'],
    },
    loadChildren: () =>
      import('./features/opportunities/opportunities.routes').then(
        (m) => m.OPPORTUNITIES_ROUTES
      ),
  },

  {
    path: 'attendance',
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'executivegpon', 'supervisor', 'HHRR'],
    },
    loadChildren: () =>
      import('./features/attendance/attendance.routes').then(
        (m) => m.ATTENDANCE_ROUTES
      ),
  },

  {
    path: 'user',
    canActivate: [roleGuard],
    data: {
      expectedRoles: [
        'admin',
        'executive',
        'executivegpon',
        'supervisor',
        'HHRR',
      ],
    },
    loadChildren: () =>
      import('./features/user-management/user.routes').then(
        (m) => m.USER_MANAGEMENT_ROUTES
      ),
  },

  {
    path: 'team',
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin', 'supervisor'] },
    loadChildren: () =>
      import('./features/team-management/team.routes').then(
        (m) => m.TEAM_MANAGEMENT_ROUTES
      ),
  },
  {
    path: 'client',
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin', 'supervisor'] },
    loadChildren: () =>
      import('./features/client-management/client.routes').then(
        (m) => m.CLIENT_MANAGEMENT_ROUTES
      ),
  },

  {
    path: 'surveys',
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'executivegpon', 'supervisor', 'HHRR'],
    },
    loadChildren: () =>
      import('./features/surveys/surveys.routes').then((m) => m.SURVEY_ROUTES),
  },
];
