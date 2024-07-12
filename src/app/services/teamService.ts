import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../env/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class TeamService{
    apiUrl=`${environment.apiUrl}/team`
    constructor(private httpClient:HttpClient){}

    getTeams():Observable<any>{
        return this.httpClient.get(this.apiUrl);
    }
}