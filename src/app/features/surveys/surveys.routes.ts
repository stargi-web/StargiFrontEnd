import { Routes } from '@angular/router';
import { SurveysPageComponent } from './pages/surveys-page/surveys-page.component';

export const surveysRoutes: Routes = [
  {
    path: '', // Ruta relativa: /surveys
    component: SurveysPageComponent,
    children: [
      //   {
      //     path: '', // Ruta relativa: /surveys
      //     component: SurveyListComponent, // Listado de encuestas
      //   },
      //   {
      //     path: 'detail/:id', // Ruta relativa: /surveys/detail/1
      //     component: SurveyDetailComponent, // Detalle de encuesta
      //   },
      //   {
      //     path: 'create', // Ruta relativa: /surveys/create
      //     component: SurveyFormComponent, // Formulario de creación
      //     canActivate: [HhrrGuard], // Solo accesible para HHRR
      //   },
      //   {
      //     path: 'edit/:id', // Ruta relativa: /surveys/edit/1
      //     component: SurveyFormComponent, // Formulario de edición
      //     canActivate: [HhrrGuard], // Solo accesible para HHRR
      //   },
    ],
  },
];
