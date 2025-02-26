import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MessageNotificationService } from '../../../shared/services/message-toast.service';
import { Deactivation } from '../models/dactivation.interface';

@Injectable({
  providedIn: 'root',
})
export class DeactivationService {
  private apiUrl = `${environment.apiUrl}/deactivations`;
  constructor(
    private httpClient: HttpClient,
    private messageNotificationService: MessageNotificationService
  ) {}

  getAllDeactivations(): Observable<Deactivation[]> {
    return this.httpClient.get<Deactivation[]>(`${this.apiUrl}`).pipe(
      catchError((error) => {
        // Manejar el error y mostrar notificación
        return throwError(
          () => new Error('Error al obtener las desactivaciones')
        );
      })
    );
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.apiUrl}/upload`, formData).pipe(
      tap(() => {
        // Mostrar mensaje de éxito
        this.messageNotificationService.showSuccess(
          'Desactivaciones subidas con éxito'
        );
      }),
      catchError((error) => {
        // Manejar el error y mostrar notificación
        return throwError(() => new Error('Error al subir el archivo'));
      })
    );
  }
}
