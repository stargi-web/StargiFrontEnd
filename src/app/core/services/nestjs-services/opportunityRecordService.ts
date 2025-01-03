import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OpportunityRecordService {
  private apiUrl = `${environment.apiUrl}/opportunityRecord`;
  constructor(private httpClient: HttpClient) {}
  getRecordsByOppId(oppId: number) {
    return this.httpClient.get<any>(`${this.apiUrl}/${oppId}`);
  }
}
