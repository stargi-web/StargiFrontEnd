import { Routes } from '@angular/router';
import { ClientCollectionsPageComponent } from './pages/client-collections-page/client-collections-page.component';
import { ClientCollectionDetailsPageComponent } from './pages/client-collection-details-page/client-collection-details-page.component';

export const CLIENT_MANAGEMENT_ROUTES: Routes = [
  { path: '', redirectTo: 'collection', pathMatch: 'full' },
  { path: 'collection', component: ClientCollectionsPageComponent },
  {
    path: 'collection/:id',
    component: ClientCollectionDetailsPageComponent,
  },
];
