import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ExecutiveNavigationComponent } from './features/executive/executive-navigation/executive-navigation.component';
import { ExecutiveDashboardComponent } from './features/executive/executive-dashboard/executive-dashboard.component';
import { ExecutiveCreateOpportunityComponent } from './features/executive/executive-create-opportunity/executive-create-opportunity.component';

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
    }
];
