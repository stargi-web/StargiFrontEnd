import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/authGuard';
import { AccumulatedPageComponent } from './pages/accumulated-page/accumulated-page.component';

export const ACCUMULATED_ROUTES: Routes = [
  {
    path: '',
    component: AccumulatedPageComponent,
    pathMatch: 'full',
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['admin', 'HHRR'],
    },
  },
];
