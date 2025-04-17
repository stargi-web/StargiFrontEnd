import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MessageNotificationService } from '../../../shared/services/message-toast.service';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = `${environment.apiUrl}/user`;
  constructor(
    private httpClient: HttpClient,
    private messageNotificationService: MessageNotificationService
  ) {}
  getUsers(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }
  getUsersIncludingAdmins(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/all`);
  }
  getUserById(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }

  getUsersDeleted(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/deleted`);
  }

  restoreUser(userId: number): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/recover/${userId}`, {}).pipe(
      tap(() => {
        // Mostrar mensaje de éxito
        this.messageNotificationService.showSuccess(
          'Usuario restaurado  exitosamente'
        );
      }),
      catchError((error) => {
        // Manejar el error y mostrar notificación
        return throwError(() => new Error('Error al restaurar usuario'));
      })
    );
  }
  changePassword(body: { userId: number; password: string }): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/password`, body);
  }
  getUsersByTeamId(teamId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${teamId}/team`);
  }

  getLeadingTeamInfo(userId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${userId}/leader/team`);
  }

  getUsersByRole(role: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${role}/role`);
  }

  createUser(body: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, body);
  }
  deleteUser(userId: number) {
    return this.httpClient.delete<any>(`${this.apiUrl}/${userId}`);
  }

  updateUserTeam(userId: number, body: any): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/${userId}/team`, body).pipe(
      tap(() => {
        // Mostrar mensaje de éxito
        this.messageNotificationService.showSuccess(
          'Usuario cambiado de equipo exitosamente'
        );
      }),
      catchError((error) => {
        // Manejar el error y mostrar notificación
        return throwError(
          () => new Error('Error al remover usuario del equipo')
        );
      })
    );
  }

  getExecutivesWithoutTeam(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/executives/no-team`).pipe(
      catchError((error) => {
        // Manejar el error y mostrar notificación
        return throwError(
          () => new Error('Error al obtener usuarios ejecutivos sin equipo')
        );
      })
    );
  }
}
