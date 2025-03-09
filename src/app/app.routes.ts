import { Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { UnauthorizedPageComponent } from './shared/pages/unauthorized-page/unauthorized-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'unauthorized', component: UnauthorizedPageComponent },

  {
    path: 'files',
    loadChildren: () =>
      import('./features/file-manager/files.routes').then(
        (m) => m.FILE_MANAGER_ROUTES
      ),
  },

  {
    path: 'opportunities',
    loadChildren: () =>
      import('./features/opportunities/opportunities.routes').then(
        (m) => m.OPPORTUNITIES_ROUTES
      ),
  },

  {
    path: 'attendance',
    loadChildren: () =>
      import('./features/attendance/attendance.routes').then(
        (m) => m.ATTENDANCE_ROUTES
      ),
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./features/user-management/user.routes').then(
        (m) => m.USER_MANAGEMENT_ROUTES
      ),
  },

  {
    path: 'team',
    loadChildren: () =>
      import('./features/team-management/team.routes').then(
        (m) => m.TEAM_MANAGEMENT_ROUTES
      ),
  },

  {
    path: 'surveys',
    loadChildren: () =>
      import('./features/surveys/surveys.routes').then((m) => m.SURVEY_ROUTES),
  },

  {
    path: 'deactivations',
    loadChildren: () =>
      import('./features/deactivations/deactivations.routes').then(
        (m) => m.DEACTIVATION_ROUTES
      ),
  },

  {
    path: 'accumulated-sales',
    loadChildren: () =>
      import('./features/accumulated-sales/accumulated.routes').then(
        (m) => m.ACCUMULATED_ROUTES
      ),
  },
];
