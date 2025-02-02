import { Routes } from '@angular/router';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { CreateUserPageComponent } from './pages/create-user-page/create-user-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';

export const USER_MANAGEMENT_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: UserListPageComponent },
  { path: 'create', component: CreateUserPageComponent },
  { path: 'profile', component: UserProfilePageComponent },
];
