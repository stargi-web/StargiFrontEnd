import { Routes } from '@angular/router';
import { TeamListPageComponent } from './pages/team-list-page/team-list-page.component';
import { TeamMembersPageComponent } from './pages/team-members-page/team-members-page.component';

export const TEAM_MANAGEMENT_ROUTES: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: 'list', component: TeamListPageComponent },
  { path: 'members', component: TeamMembersPageComponent },
];
