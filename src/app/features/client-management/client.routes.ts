import { Routes } from '@angular/router';
import { ClientCollectionsPageComponent } from './pages/client-collections-page/client-collections-page.component';
import { ClientCollectionDetailsPageComponent } from './pages/client-collection-details-page/client-collection-details-page.component';
import { roleGuard } from '../../core/guards/authGuard';

export const CLIENT_MANAGEMENT_ROUTES: Routes = [
  { path: '', redirectTo: 'collection', pathMatch: 'full' },
  {
    path: 'collection',
    component: ClientCollectionsPageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin', 'supervisor'] },
  },
  {
    path: 'collection/:id',
    component: ClientCollectionDetailsPageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin', 'supervisor'] },
  },
];
