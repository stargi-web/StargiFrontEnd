import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/authGuard';
import { ViewDeletedPageComponent } from './pages/view-deleted-page/view-deleted-page.component';

export const RECYCLE_BIN_ROUTES: Routes = [
  {
    path: '',
    component: ViewDeletedPageComponent,
    pathMatch: 'full',
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['HHRR', 'admin'],
    },
  },
];
