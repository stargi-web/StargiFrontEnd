import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MessageNotificationService } from '../../../shared/services/message-toast.service';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {
  private apiUrl = `${environment.apiUrl}/opportunity`;
  constructor(
    private httpClient: HttpClient,
    private messageNotificationService: MessageNotificationService
  ) {}

  createOpportunity(body: any): Observable<any> {
    console.log('Entrando al servicio de creación');
    return this.httpClient
      .post<any>(`${this.apiUrl}`, body)
      .pipe(
        tap(() =>
          this.messageNotificationService.showSuccess(
            'Oportunidad creada con éxito'
          )
        )
      );
  }

  editOpportunity(body: any): Observable<any> {
    return this.httpClient
      .patch<any>(`${this.apiUrl}/edit`, body)
      .pipe(
        tap(() =>
          this.messageNotificationService.showSuccess(
            'Oportunidad editada con éxito'
          )
        )
      );
  }

  deleteOpportunity(oppId: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.apiUrl}/${oppId}`)
      .pipe(
        tap(() =>
          this.messageNotificationService.showSuccess(
            'Oportunidad eliminada con éxito'
          )
        )
      );
  }

  changeUser(body: { userId: number; opportunityId: number }): Observable<any> {
    return this.httpClient
      .patch<any>(`${this.apiUrl}/change-user`, body)
      .pipe(
        tap(() =>
          this.messageNotificationService.showSuccess(
            'Usuario cambiado con éxito'
          )
        )
      );
  }

  changeAllOppToNewUser(body: {
    userId: number;
    newUserId: number;
  }): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.apiUrl}/migrate-opps-to-other-executive`,
      body
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${userId}/user`);
  }

  getOpportunities(
    page: number,
    size: number,
    filters: any,
    sortField?: string,
    sortOrder?: string
  ): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (filters) {
      params = params.set('filters', JSON.stringify(filters));
    }

    if (sortField) {
      params = params
        .set('sortField', sortField)
        .set('sortOrder', sortOrder || 'ASC');
    }

    return this.httpClient.get<any>(`${this.apiUrl}/filter`, { params });
  }
}
