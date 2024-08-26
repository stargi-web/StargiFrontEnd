import { SupervisorTeamOpportunitiesComponent } from './features/supervisor/supervisor-team-opportunities/supervisor-team-opportunities.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ExecutiveNavigationComponent } from './features/executive/executive-navigation/executive-navigation.component';
import { ExecutiveDashboardComponent } from './features/executive/executive-dashboard/executive-dashboard.component';
import { ExecutiveCreateOpportunityComponent } from './features/executive/executive-create-opportunity/executive-create-opportunity.component';
import { AdminNavigationComponent } from './features/admin/admin-navigation/admin-navigation.component';
import { AdminUsersViewComponent } from './features/admin/admin-users-view/admin-users-view.component';
import { AdminUserOppComponent } from './features/admin/admin-user-opp/admin-user-opp.component';
import { AdminTeamsViewComponent } from './features/admin/admin-teams-view/admin-teams-view.component';
import { SupervisorNavigationComponent } from './features/supervisor/supervisor-navigation/supervisor-navigation.component';
import { SupervisorTeamMembersComponent } from './features/supervisor/supervisor-team-members/supervisor-team-members.component';
import { SupervisorOpportunitiesComponent } from './features/supervisor/supervisor-opportunities/supervisor-opportunities.component';
import { SupervisorCreateMemberComponent } from './features/supervisor/supervisor-create-member/supervisor-create-member.component';
import { AdminViewTeamOpportunitiesComponent } from './features/admin/admin-view-team-opportunities/admin-view-team-opportunities.component';
import { ProfileViewComponent } from './shared/components/profile-view/profile-view.component';
import { roleGuard } from './core/guards/authGuard';
import { SupervisorCreateOppComponent } from './features/supervisor/supervisor-create-opp/supervisor-create-opp.component';
import { SupervisorViewBasesComponent } from './features/supervisor/supervisor-view-bases/supervisor-view-bases.component';
import { AdminViewBasesComponent } from './features/admin/admin-view-bases/admin-view-bases.component';
import { AdminBaseDetailsComponent } from './features/admin/admin-base-details/admin-base-details.component';
import { ViewAssignedCollectionsComponent } from './shared/components/view-assigned-collections/view-assigned-collections.component';
import { ViewAssignedClientsComponent } from './shared/components/view-assigned-clients/view-assigned-clients.component';
import { AdminViewAllOpportunitiesComponent } from './features/admin/admin-view-all-opportunities/admin-view-all-opportunities.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    {
        path: 'executive',
        component: ExecutiveNavigationComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['executive', 'executivegpon'] },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirección por defecto
            { path: 'dashboard', component: ExecutiveDashboardComponent },
            { path: 'create-opportunity', component: ExecutiveCreateOpportunityComponent },
            { path: 'profile', component: ProfileViewComponent },
            {path:'bases',component:ViewAssignedCollectionsComponent},
            {path:'base/:baseId/clients',component:ViewAssignedClientsComponent}
        ]
    },
    {
        path: 'admin',
        component: AdminNavigationComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['admin'] },
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' }, // Redirección por defecto
            { path: 'users', component: AdminUsersViewComponent },
            { path: 'users-opp/:userId', component: AdminUserOppComponent },
            { path: 'teams-view', component: AdminTeamsViewComponent },
            { path: 'team-opportunities/:teamId', component: AdminViewTeamOpportunitiesComponent },
            { path: 'profile', component: ProfileViewComponent },
            {path:'opportunities',component:AdminViewAllOpportunitiesComponent},
            {path:'bases',component:AdminViewBasesComponent},
            {path:'base-detail/:id',component:AdminBaseDetailsComponent}
        ]
    },
    {
        path: 'supervisor',
        component: SupervisorNavigationComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['supervisor'] },
        children: [
            { path: '', redirectTo: 'team', pathMatch: 'full' }, // Redirección por defecto
            { path: 'team', component: SupervisorTeamMembersComponent },
            { path: 'team-opportunities', component: SupervisorTeamOpportunitiesComponent },
            { path: 'opportunities', component: SupervisorOpportunitiesComponent },
            { path: 'create-user', component: SupervisorCreateMemberComponent },
            { path: 'create-opportunity', component: SupervisorCreateOppComponent },
            { path: 'profile', component: ProfileViewComponent },
            {path:'bases',component:ViewAssignedCollectionsComponent},
            {path:'base/:baseId/clients',component:ViewAssignedClientsComponent}
        ]
    }
];