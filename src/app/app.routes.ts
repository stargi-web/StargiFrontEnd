import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { roleGuard } from './core/guards/authGuard';
import { ProfileViewComponent } from './shared/components/profile-view/profile-view.component';
import { FileStorageComponent } from './features/file-manager/file-storage/file-storage.component';
import { AdminUsersViewComponent } from './features/roles/admin/admin-users-view/admin-users-view.component';
import { AdminTeamsViewComponent } from './features/roles/admin/admin-teams-view/admin-teams-view.component';

import { AdminViewBasesComponent } from './features/roles/admin/admin-view-bases/admin-view-bases.component';
import { AdminBaseDetailsComponent } from './features/roles/admin/admin-base-details/admin-base-details.component';
import { AdminCreateUserComponent } from './features/roles/admin/admin-create-user/admin-create-user.component';
import { SupervisorTeamMembersComponent } from './features/roles/supervisor/supervisor-team-members/supervisor-team-members.component';
import { SupervisorCreateMemberComponent } from './features/roles/supervisor/supervisor-create-member/supervisor-create-member.component';
import { ViewAssignedCollectionsComponent } from './shared/components/view-assigned-collections/view-assigned-collections.component';
import { ViewAssignedClientsComponent } from './shared/components/view-assigned-clients/view-assigned-clients.component';

import { CreateOpportunityPageComponent } from './features/opportunities/pages/create-opportunity-page/create-opportunity-page.component';

import { RegisterAttendancePageComponent } from './features/attendance/pages/register-attendance-page/register-attendance-page.component';
import { UsersAttendancePageComponent } from './features/attendance/pages/users-attendance-page/users-attendance-page.component';
import { OpportunitiesTeamPageComponent } from './features/opportunities/pages/opportunities-team-page/opportunities-team-page.component';
import { OpportunitiesUserPageComponent } from './features/opportunities/pages/opportunities-user-page/opportunities-user-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },

  // Rutas comunes
  {
    path: 'profile',
    component: ProfileViewComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: [
        'executive',
        'executivegpon',
        'supervisor',
        'admin',
        'HHRR',
      ],
    },
  },
  {
    path: 'files',
    component: FileStorageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: [
        'executive',
        'executivegpon',
        'supervisor',
        'admin',
        'HHRR',
      ],
    },
  },

  // Rutas de oportunidades
  {
    path: 'opportunities',

    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'executivegpon', 'supervisor', 'admin'],
    },
    children: [
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
    ],
  },

  // Rutas de asistencia
  {
    path: 'attendance',
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'executivegpon', 'supervisor', 'HHRR'],
    },
    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'register', component: RegisterAttendancePageComponent },
      { path: 'users', component: UsersAttendancePageComponent },
    ],
  },

  // Rutas de administración
  {
    path: 'admin',
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin', 'HHRR'] },
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: AdminUsersViewComponent },
      { path: 'teams', component: AdminTeamsViewComponent },
      { path: 'bases', component: AdminViewBasesComponent },
      { path: 'base-detail/:id', component: AdminBaseDetailsComponent },
      { path: 'create-user', component: AdminCreateUserComponent },
    ],
  },

  // Rutas de equipos
  {
    path: 'team',
    canActivate: [roleGuard],
    data: { expectedRoles: ['supervisor'] },
    children: [
      { path: '', redirectTo: 'members', pathMatch: 'full' },
      { path: 'members', component: SupervisorTeamMembersComponent },
      { path: 'create-user', component: SupervisorCreateMemberComponent },
      { path: 'bases', component: ViewAssignedCollectionsComponent },
      { path: 'base/:baseId/clients', component: ViewAssignedClientsComponent },
    ],
  },

  // Rutas de encuestas (RRHH)
  {
    path: 'surveys',
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'executivegpon', 'supervisor', 'HHRR'],
    },
    children: [
      // { path: '', component: RrhhSurverysComponent },
      //{ path: 'create-user', component: AdminCreateUserComponent },
    ],
  },
];
