import { Routes } from '@angular/router';
import { CreateOpportunityPageComponent } from './pages/create-opportunity-page/create-opportunity-page.component';
import { OpportunitiesTeamPageComponent } from './pages/opportunities-team-page/opportunities-team-page.component';
import { OpportunitiesUserPageComponent } from './pages/opportunities-user-page/opportunities-user-page.component';

export const OPPORTUNITIES_ROUTES: Routes = [
  {
    path: '',
    component: OpportunitiesTeamPageComponent,
    pathMatch: 'full',
  },
  { path: 'create', component: CreateOpportunityPageComponent },
  {
    path: 'team/:teamId',
    component: OpportunitiesTeamPageComponent,
  },
  {
    path: 'user',
    component: OpportunitiesUserPageComponent,
  },
  {
    path: 'user/:userId',
    component: OpportunitiesUserPageComponent,
  },
];
