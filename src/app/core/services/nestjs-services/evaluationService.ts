import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { HttpClient } from '@angular/common/http';
import { CreateEvaluationBody } from '../../models/createEvaluationBody';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private apiUrl = `${environment.apiUrl}/evaluations`;
  constructor(private httpClient: HttpClient) {}

  sendEvaluation(
    evaluatorId: number,
    evaluatedId: number,
    data: CreateEvaluationBody
  ) {
    const body = {
      evaluatorId: evaluatorId,
      evaluatedId: evaluatedId,
      data: data,
    };

    return this.httpClient.post<any>(`${this.apiUrl}/send`, body);
  }
}
