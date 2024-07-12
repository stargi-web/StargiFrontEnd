import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../env/environment";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root',
})
export class UserService{
    apiUrl=`${environment.apiUrl}/user`;
    constructor(private httpClient:HttpClient){}   
    getUsers():Observable<any>{
        return this.httpClient.get(this.apiUrl);
    } 
}