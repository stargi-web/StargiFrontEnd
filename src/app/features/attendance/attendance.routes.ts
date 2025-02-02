import { Routes } from '@angular/router';
import { RegisterAttendancePageComponent } from './pages/register-attendance-page/register-attendance-page.component';
import { UsersAttendancePageComponent } from './pages/users-attendance-page/users-attendance-page.component';

export const ATTENDANCE_ROUTES: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterAttendancePageComponent },
  { path: 'users', component: UsersAttendancePageComponent },
];
