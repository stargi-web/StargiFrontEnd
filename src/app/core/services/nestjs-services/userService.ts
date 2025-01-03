import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = `${environment.apiUrl}/user`;
  constructor(private httpClient: HttpClient) {}
  getUsers(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }
  getUsersIncludingAdmins(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/all`);
  }
  getUserById(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
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
}
