import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = `${environment.apiUrl}/attendance`;
  constructor(private httpClient: HttpClient) {}
  registerAttendance(userId: number) {
    return this.httpClient.post<any>(`${this.apiUrl}/register/${userId}`, null);
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
