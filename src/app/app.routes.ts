import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ExecutiveNavigationComponent } from './features/executive/executive-navigation/executive-navigation.component';
import { ExecutiveDashboardComponent } from './features/executive/executive-dashboard/executive-dashboard.component';
import { ExecutiveCreateOpportunityComponent } from './features/executive/executive-create-opportunity/executive-create-opportunity.component';
import { AdminNavigationComponent } from './features/admin/admin-navigation/admin-navigation.component';
import path from 'path';
import { Component } from '@angular/core';
import { AdminUsersViewComponent } from './features/admin/admin-users-view/admin-users-view.component';
import { AdminUserOppComponent } from './features/admin/admin-user-opp/admin-user-opp.component';
import { AdminTeamsViewComponent } from './features/admin/admin-teams-view/admin-teams-view.component';

export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:AuthComponent},
    {
        path:'executive',
        component:ExecutiveNavigationComponent,
        children:[
            {
                path:'dashboard',
                component:ExecutiveDashboardComponent
            },
            {
                path:'create-opportunity',
                component:ExecutiveCreateOpportunityComponent
            }
        ]
    },
    {
        path:'admin',
        component:AdminNavigationComponent,
        children:[
            {
                path:'users',
                component:AdminUsersViewComponent
            },
            {
                path:'users-opp/:userId',
                component:AdminUserOppComponent
            },
            {
                path:'teams-view',
                component:AdminTeamsViewComponent
            }
        ]
    }
];
