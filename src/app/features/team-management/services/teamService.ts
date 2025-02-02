import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { Observable } from 'rxjs';
import { CreateTeamDto } from '../models/createTeamDto';
import { AssignLeaderTeamDto } from '../../../features/team-management/models/assingLeaderTeamDto';
import { AssignTeamMemberDto } from '../../../features/team-management/models/assingTeamMemberDto';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  apiUrl = `${environment.apiUrl}/team`;
  constructor(private httpClient: HttpClient) {}

  getTeams(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  createTeam(body: CreateTeamDto): Observable<any> {
    return this.httpClient.post(this.apiUrl, body);
  }

  assignLeader(body: AssignLeaderTeamDto): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/leader`, body);
  }

  assignTeamToMember(body: AssignTeamMemberDto): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/member`, body);
  }
}
