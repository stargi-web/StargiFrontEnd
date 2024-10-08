import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "../env/environment";
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
    providedIn:'root',
})
export class OpportunityService{
    private apiUrl=`${environment.apiUrl}/opportunity`;
    constructor(private httpClient:HttpClient){}

    getOpportunitiesByUserId(userId:number){
        return this.httpClient.get<any>(`${this.apiUrl}/${userId}`).pipe(
            tap(response=>{
                
            }),catchError(this.handleError)
        )
    }
    getAllOpportunities(){
        return this.httpClient.get<any>(`${this.apiUrl}`);
    }
    getOpportunitiesByTeamId(teamId:number):Observable<any>{
        return this.httpClient.get(`${this.apiUrl}/${teamId}/team`);
    }
    createOpportunity(body:any){
        console.log("Entrando al servicio de creación");
        return this.httpClient.post<any>(
            `${this.apiUrl}`,body).pipe(
                tap(response=>(console.log("Enviando opp"))),
                catchError(this.handleError));
    }
    editOpportunity(body:any){
        return this.httpClient.patch<any>(`${this.apiUrl}/edit`,body).pipe(
            catchError(this.handleError)
        );
    }
    deleteOpportunity(oppId:number):Observable<any>{
        return this.httpClient.delete(`${this.apiUrl}/${oppId}`);
    }
    changeUser(body:{userId:number,opportunityId:number}):Observable<any>{
        return this.httpClient.patch(`${this.apiUrl}/change-user`,body);
    }
    changeAllOppToNewUser(body:{userId:number,newUserId:number}){
        console.log(body)
        return this.httpClient.patch<any>(`${this.apiUrl}/migrate-opps-to-other-executive`,body);
    }
    private handleError(error:HttpErrorResponse){
        if(error.status===0){
          console.error('Se ha producio un error ', error.error);
        }
        else{
          console.error('Backend retornó el código de estado ', error);
        }
        return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
    }
}