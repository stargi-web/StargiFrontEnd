import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Survey } from '../models/survey.interface';
import { MessageNotificationService } from '../../../shared/services/message-toast.service';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = `${environment.apiUrl}/surveys`;
  constructor(
    private httpClient: HttpClient,
    private messageNotificationService: MessageNotificationService
  ) {}

  getAllSurveys(): Observable<Survey[]> {
    return this.httpClient.get<Survey[]>(`${this.apiUrl}`).pipe(
      catchError((error) => {
        // Manejar el error y mostrar notificación
        this.handleError(error);
        return throwError(() => new Error('Error al obtener las encuestas'));
      })
    );
  }

  createSurvey(survey: Survey): Observable<Survey> {
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient
      .post<Survey>(`${this.apiUrl}/create`, survey, { headers })
      .pipe(
        tap(() => {
          // Mostrar mensaje de éxito
          this.messageNotificationService.showSuccess(
            'Encuesta creada con éxito'
          );
        }),
        catchError((error) => {
          // Manejar el error y mostrar notificación
          this.handleError(error);
          return throwError(() => new Error('Error al crear la encuesta'));
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);

    // Mostrar mensaje de error al usuario
    this.messageNotificationService.showError(error);

    // Devolver un mensaje genérico para el componente (opcional)
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
