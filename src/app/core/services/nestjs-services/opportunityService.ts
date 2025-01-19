import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {
  private apiUrl = `${environment.apiUrl}/opportunity`;
  constructor(private httpClient: HttpClient) {}

  getOpportunitiesByUserId(userId: number) {
    return this.httpClient.get<any>(`${this.apiUrl}/${userId}`).pipe(
      tap((response) => {}),
      catchError(this.handleError)
    );
  }
  getAllOpportunities() {
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }
  getAllOpportunitiesDeleted() {
    return this.httpClient.get<any>(`${this.apiUrl}/deleted`);
  }
  getAllOpportunitiesPaginated(page: number, limit: number, filter: any) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/filter/${page}/page/${limit}/limit`,
      filter
    );
  }
  getOpportunitiesByTeamIdPaginatedAndFiltered(
    teamId: number,
    page: number,
    limit: number,
    filter: any
  ) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/${teamId}/team/filter/${page}/page/${limit}/limit`,
      filter
    );
  }
  getOpportunitiesByUserIdPaginatedAndFiltered(
    userId: number,
    page: number,
    limit: number,
    filter: any
  ) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/${userId}/user/${page}/page/${limit}/limit`,
      filter
    );
  }
  getOpportunitiesByTeamId(teamId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${teamId}/team`);
  }
  getOpportunitiesDeletedByTeamId(teamId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${teamId}/team/deleted`);
  }

  createOpportunity(body: any) {
    console.log('Entrando al servicio de creación');
    return this.httpClient.post<any>(`${this.apiUrl}`, body).pipe(
      tap((response) => console.log('Enviando opp')),
      catchError(this.handleError)
    );
  }
  editOpportunity(body: any) {
    return this.httpClient
      .patch<any>(`${this.apiUrl}/edit`, body)
      .pipe(catchError(this.handleError));
  }
  deleteOpportunity(oppId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${oppId}`);
  }
  changeUser(body: { userId: number; opportunityId: number }): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/change-user`, body);
  }
  changeAllOppToNewUser(body: { userId: number; newUserId: number }) {
    return this.httpClient.patch<any>(
      `${this.apiUrl}/migrate-opps-to-other-executive`,
      body
    );
  }
  deleteUser(userId: Number) {
    return this.httpClient.delete<any>(`${this.apiUrl}/${userId}/user`);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    } else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
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
