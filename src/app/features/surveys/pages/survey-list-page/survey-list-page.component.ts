import { Component } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.interface';
import { PaginatorModule } from 'primeng/paginator';

import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, PaginatorModule],
  providers: [],
  templateUrl: './survey-list-page.component.html',
  styleUrl: './survey-list-page.component.css',
})
export class SurveyListPageComponent {
  userId!: number;
  userRole!: string;
  surveys: Survey[] = [];
  paginatedSurveys: Survey[] = [];
  first: number = 0;
  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.userRole = sessionStorage.getItem('role') || '';
    this.surveyService
      .getAllSurveysWithHasAnswered(this.userId)
      .subscribe((response) => {
        this.surveys = response;
        this.updatePage();
      });
  }
  hasAdminPermission(): boolean {
    return this.userRole === 'admin' || this.userRole === 'HHRR';
  }

  updatePage() {
    this.paginatedSurveys = this.surveys.slice(this.first, this.first + 6);
  }
  // Manejar el cambio de página
  onPageChange(event: any) {
    this.first = event.first; // Actualiza el índice del primer elemento
    this.updatePage(); // Actualiza las encuestas visibles
  }

  downloadExcel(survey: Survey) {
    if (survey.id !== undefined) {
      this.surveyService.downloadSurveyExcel(survey.id);
    }
  }

  closeSurvey(survey: Survey) {
    // Lógica para cerrar la encuesta
    console.log('Cerrando la encuesta:', survey);
    // Actualiza el estado de la encuesta o realiza la acción correspondiente
  }
  goToCreateSurveyPage() {
    this.router.navigate([`/surveys/create`]);
  }
  goToResponseSurveyPage(surveyId: number | undefined) {
    if (!surveyId) return;
    this.router.navigate([`/surveys`, surveyId]);
  }
}
