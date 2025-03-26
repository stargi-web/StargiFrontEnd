import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { MessageNotificationService } from '../../../shared/services/message-toast.service';
import { Annex } from '../models/annex.interface';

@Injectable({
  providedIn: 'root',
})
export class AnnexService {
  private apiUrl = `${environment.apiUrl}/annexes`;
  constructor(
    private httpClient: HttpClient,
    private messageNotificationService: MessageNotificationService
  ) {}

  getAllAnnexes(): Observable<Annex[]> {
    return this.httpClient.get<Annex[]>(`${this.apiUrl}`).pipe(
      catchError((error) => {
        // Manejar el error y mostrar notificación
        return throwError(() => new Error('Error al obtener las encuestas'));
      })
    );
  }

  createAnnex(annex: any): Observable<Annex> {
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient
      .post<Annex>(`${this.apiUrl}/create`, annex, { headers })
      .pipe(
        tap(() => {
          // Mostrar mensaje de éxito
          this.messageNotificationService.showSuccess('Anexo creado con éxito');
        }),
        catchError((error) => {
          // Manejar el error y mostrar notificación
          return throwError(() => new Error('Error al crear el anexo'));
        })
      );
  }

  deleteAnnex(annexId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/delete/${annexId}`).pipe(
      tap(() => {
        // Mostrar mensaje de éxito
        this.messageNotificationService.showSuccess(
          'Anexo eliminado con éxito'
        );
      }),
      catchError((error) => {
        // Manejar el error y mostrar notificación
        return throwError(() => new Error('Error al eliminar el anexo'));
      })
    );
  }
}
