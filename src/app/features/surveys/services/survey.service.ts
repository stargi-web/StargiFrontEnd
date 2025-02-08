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

        return throwError(() => new Error('Error al obtener las encuestas'));
      })
    );
  }

  getAllSurveysWithHasAnswered(userId: number): Observable<Survey[]> {
    return this.httpClient.get<Survey[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError((error) => {
        // Manejar el error y mostrar notificación

        return throwError(
          () => new Error('Error al obtener las encuestas del usuario')
        );
      })
    );
  }

  getSurveyById(surveyId: number): Observable<Survey> {
    return this.httpClient.get<Survey>(`${this.apiUrl}/${surveyId}`).pipe(
      catchError((error) => {
        // Manejar el error y mostrar notificación

        return throwError(() => new Error('Error al obtener la encuesta'));
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

          return throwError(() => new Error('Error al crear la encuesta'));
        })
      );
  }

  sendSurveyResponse(answer: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient
      .post<any>(`${this.apiUrl}/answer`, answer, { headers })
      .pipe(
        tap(() => {
          // Mostrar mensaje de éxito
          this.messageNotificationService.showSuccess(
            'Respuesta enviada con éxito'
          );
        }),
        catchError((error) => {
          // Manejar el error y mostrar notificación

          return throwError(() => new Error('Error al enviar la respuesta'));
        })
      );
  }

  downloadSurveyExcel(surveyId: number): void {
    const url = `${this.apiUrl}/download/${surveyId}`;

    this.httpClient
      .get(url, { responseType: 'blob' })
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Error al descargar el archivo Excel')
          );
        })
      )
      .subscribe({
        next: (blob) => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = `encuesta_${surveyId}.xlsx`;
          a.click();
          URL.revokeObjectURL(objectUrl);
        },
        error: (error) => {},
      });
  }
}
