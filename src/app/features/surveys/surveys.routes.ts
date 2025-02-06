import { Routes } from '@angular/router';
import { SurveyCreatePageComponent } from './pages/survey-create-page/survey-create-page.component';
import { roleGuard } from '../../core/guards/authGuard';
import { SurveyListPageComponent } from './pages/survey-list-page/survey-list-page.component';
import { SurveyAnswerPageComponent } from './pages/survey-answer-page/survey-answer-page.component';

export const SURVEY_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: SurveyListPageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['executive', 'supervisor', 'admin', 'HHRR'] },
  },
  {
    path: 'create',
    component: SurveyCreatePageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['admin', 'HHRR'] },
  },
  {
    path: ':surveyId',
    component: SurveyAnswerPageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['executive', 'supervisor', 'admin', 'HHRR'] },
  },
];
