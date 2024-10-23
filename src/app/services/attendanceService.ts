import { Injectable } from "@angular/core";
import { environment } from "../env/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root',
})
export class AttendanceService{
    private apiUrl=`${environment.apiUrl}/attendance`;
    constructor(private httpClient:HttpClient){}
    registerAttendance(userId:number){
        return this.httpClient.post<any>(`${this.apiUrl}/register/${userId}`,null);
    }
    getAttendancesByUserAndDates(userId:number,startDate:string,endDate:string){
        return this.httpClient.get<any>(`${this.apiUrl}/user/${userId}/dates?startDate=${startDate}&endDate=${endDate}`);
    }
    getAttendanceSummaryByRole(month:number,year:number){
        return this.httpClient.get<any>(`${this.apiUrl}/by-role?month=${month}&year=${year}`);
    }
}
