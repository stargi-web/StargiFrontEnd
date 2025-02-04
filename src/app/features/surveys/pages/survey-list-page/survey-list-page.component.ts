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
  surveys: Survey[] = [];
  paginatedSurveys: Survey[] = [];
  first: number = 0;
  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.surveyService.getAllSurveys().subscribe((response) => {
      this.surveys = response;
      this.updatePage();
    });
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
    // Lógica para descargar la encuesta en formato Excel
    console.log('Descargando Excel para la encuesta:', survey);
    // Aquí puedes integrar una librería como xlsx para generar el archivo Excel
  }

  closeSurvey(survey: Survey) {
    // Lógica para cerrar la encuesta
    console.log('Cerrando la encuesta:', survey);
    // Actualiza el estado de la encuesta o realiza la acción correspondiente
  }
  goToCreateSurveyPage() {
    this.router.navigate([`/surveys/create`]);
  }
  goToResponseSurveyPage() {
    this.router.navigate([`/surveys/response`]);
  }
}
