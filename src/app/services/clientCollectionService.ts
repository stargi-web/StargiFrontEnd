import { Injectable } from "@angular/core";
import { environment } from "../env/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root',
})
export class ClientCollectionService{
    private apiUrl=`${environment.apiUrl}/clientCollection`;
    constructor(private httpClient:HttpClient){}

    getCollectionsByUserId(userId:number){
        return this.httpClient.get<any>(`${this.apiUrl}/user/${userId}`);
    }
    createCollection(userId:number,name:string){
        return this.httpClient.post<any>(`${this.apiUrl}`,{userId,name});
    }
    getAllCollections(){
        return this.httpClient.get<any>(`${this.apiUrl}`);
    }
    getCollectionsByAssignedUser(userId:number){
        return this.httpClient.get<any>(`${this.apiUrl}/collections-by-user/${userId}`);
    }
}