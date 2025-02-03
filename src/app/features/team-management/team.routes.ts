import { Routes } from '@angular/router';
import { TeamListPageComponent } from './pages/team-list-page/team-list-page.component';
import { TeamMembersPageComponent } from './pages/team-members-page/team-members-page.component';
import { roleGuard } from '../../core/guards/authGuard';

export const TEAM_MANAGEMENT_ROUTES: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  {
    path: 'list',
    component: TeamListPageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin'] },
  },
  {
    path: 'members',
    component: TeamMembersPageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin', 'supervisor'] },
  },
];
