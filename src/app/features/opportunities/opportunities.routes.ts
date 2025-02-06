import { Routes } from '@angular/router';
import { CreateOpportunityPageComponent } from './pages/create-opportunity-page/create-opportunity-page.component';
import { OpportunitiesTeamPageComponent } from './pages/opportunities-team-page/opportunities-team-page.component';
import { OpportunitiesUserPageComponent } from './pages/opportunities-user-page/opportunities-user-page.component';
import { roleGuard } from '../../core/guards/authGuard';

export const OPPORTUNITIES_ROUTES: Routes = [
  {
    path: '',
    component: OpportunitiesTeamPageComponent,
    pathMatch: 'full',
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['supervisor', 'admin'],
    },
  },
  {
    path: 'create',
    component: CreateOpportunityPageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'supervisor', 'admin'],
    },
  },
  {
    path: 'team/:teamId',
    component: OpportunitiesTeamPageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['admin'],
    },
  },
  {
    path: 'user',
    component: OpportunitiesUserPageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'supervisor', 'admin'],
    },
  },
  {
    path: 'user/:userId',
    component: OpportunitiesUserPageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['admin'],
    },
  },
];
