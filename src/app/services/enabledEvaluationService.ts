import { Injectable } from "@angular/core";
import { environment } from "../env/environment";
import { HttpClient } from "@angular/common/http";
import { CreateEvaluationBody } from "../core/models/createEvaluationBody";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class EnabledEvaluationService{
    private apiUrl=`${environment.apiUrl}/enabledsupervisorevaluation`;
    constructor(private httpClient:HttpClient){}

    createEnableEvaluation(body:{month:string,year:number}){
        return this.httpClient.post<any>(`${this.apiUrl}/create`,body);
    }
    getAll(){
        return this.httpClient.get<any>(this.apiUrl);
    }
}