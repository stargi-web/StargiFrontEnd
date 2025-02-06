import { Routes } from '@angular/router';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { CreateUserPageComponent } from './pages/create-user-page/create-user-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { roleGuard } from '../../core/guards/authGuard';

export const USER_MANAGEMENT_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: UserListPageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['admin'],
    },
  },
  {
    path: 'create',
    component: CreateUserPageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['admin', 'supervisor', 'HHRR'],
    },
  },
  {
    path: 'profile',
    component: UserProfilePageComponent,
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['admin', 'supervisor', 'HHRR', 'executive'],
    },
  },
];
