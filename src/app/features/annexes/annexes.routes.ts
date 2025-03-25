import { Routes } from '@angular/router';

import { roleGuard } from '../../core/guards/authGuard';
import { AnnexesListPageComponent } from './pages/annexes-list-page/annexes-list-page.component';

export const ANNEX_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: AnnexesListPageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['executive', 'supervisor', 'admin', 'HHRR'] },
  },
];
