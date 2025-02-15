import { Component } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.interface';
import { PaginatorModule } from 'primeng/paginator';

import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-survey-list-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    PaginatorModule,
    ConfirmDialogModule,
  ],
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
  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userId = Number(
      this.sessionStorageService.getItem(SESSION_ITEMS.USER_ID)
    );
    this.userRole =
      this.sessionStorageService.getItem(SESSION_ITEMS.ROLE) || '';
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
      this.surveyService.downloadSurveyExcel(survey.id).subscribe({
        next: (blob) => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = `encuesta_${survey.id}.xlsx`;
          a.click();
          URL.revokeObjectURL(objectUrl);
        },
      });
    }
  }

  confirmDelete(event: Event, survey: Survey) {
    if (survey.id !== undefined) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro que quiere eliminar esta encuesta?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          if (survey.id !== undefined) {
            this.deleteSurvey(survey.id);
          }
        },
        reject: () => {},
      });
    }
  }

  deleteSurvey(surveyId: number) {
    this.surveyService.deleteSurvey(surveyId).subscribe({
      next: () => {
        this.surveys = this.surveys.filter((survey) => survey.id !== surveyId);
        this.updatePage();
      },
    });
  }

  goToCreateSurveyPage() {
    this.router.navigate([`/surveys/create`]);
  }
  goToResponseSurveyPage(surveyId: number | undefined) {
    if (!surveyId) return;
    this.router.navigate([`/surveys`, surveyId]);
  }
}
