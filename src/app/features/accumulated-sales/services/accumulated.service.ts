import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MessageNotificationService } from '../../../shared/services/message-toast.service';
import { Accumulated } from '../models/accumulated.interface';

@Injectable({
  providedIn: 'root',
})
export class AccumulatedService {
  private apiUrl = `${environment.apiUrl}/accumulated`;
  constructor(
    private httpClient: HttpClient,
    private messageNotificationService: MessageNotificationService
  ) {}

  getLastAccumulated(): Observable<Accumulated> {
    return this.httpClient.get<Accumulated>(`${this.apiUrl}/last`).pipe(
      catchError((error) => {
        // Manejar el error y mostrar notificación
        return throwError(() => new Error('Error al obtener el acumulado'));
      })
    );
  }

  updateAccumulated(accumulated: Accumulated): Observable<Accumulated> {
    return this.httpClient
      .post<Accumulated>(`${this.apiUrl}/update`, accumulated)
      .pipe(
        tap(() => {
          // Mostrar mensaje de éxito
          this.messageNotificationService.showSuccess('Acumulado actualizado');
        }),
        catchError((error) => {
          // Manejar el error y mostrar notificación
          return throwError(
            () => new Error('Error al actualizar el acumulado')
          );
        })
      );
  }
}
