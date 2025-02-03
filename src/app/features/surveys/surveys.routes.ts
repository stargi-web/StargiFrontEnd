import { Routes } from '@angular/router';
import { SurveyCreatePageComponent } from './pages/survey-create-page/survey-create-page.component';
import { roleGuard } from '../../core/guards/authGuard';

export const SURVEY_ROUTES: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  {
    path: 'create',
    component: SurveyCreatePageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin', 'HHRR'] },
  },
];
