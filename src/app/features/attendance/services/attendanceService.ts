import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MessageNotificationService } from '../../../shared/services/message-toast.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = `${environment.apiUrl}/attendance`;
  constructor(
    private httpClient: HttpClient,
    private messageNotificationService: MessageNotificationService
  ) {}

  registerAttendance(userId: number): Observable<any> {
    return this.httpClient
      .post<any>(`${this.apiUrl}/register/${userId}`, null)
      .pipe(
        tap(() => {
          // Mostrar mensaje de éxito
          this.messageNotificationService.showSuccess('Asistencia registrada');
        }),
        catchError((error) => {
          // Manejar el error y mostrar notificación
          return throwError(
            () => new Error('Error al registrar la asistencia')
          );
        })
      );
  }
  getAttendancesByUserAndDates(
    userId: number,
    startDate: string,
    endDate: string
  ) {
    return this.httpClient.get<any>(
      `${this.apiUrl}/user/${userId}/dates?startDate=${startDate}&endDate=${endDate}`
    );
  }
  getAttendanceSummaryByRole(month: number, year: number) {
    return this.httpClient.get<any>(
      `${this.apiUrl}/by-role?month=${month}&year=${year}`
    );
  }
  justifyAttendance(id: number) {
    return this.httpClient.patch(`${this.apiUrl}/${id}/justify`, null);
  }
  getAttendanceExcelFile(month: number, year: number) {
    return this.httpClient.get(
      `${this.apiUrl}/generate-excel?month=${month}&year=${year}`,
      {
        responseType: 'blob', // Esto indica que la respuesta será un archivo binario
      }
    );
  }
}
