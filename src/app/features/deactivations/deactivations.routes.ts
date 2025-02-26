import { Routes } from '@angular/router';
import { DectivationsPageComponent } from './pages/dectivations-page/dectivations-page.component';
import { roleGuard } from '../../core/guards/authGuard';

export const DEACTIVATION_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: DectivationsPageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin', 'HHRR'] },
  },
];
