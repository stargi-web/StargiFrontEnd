import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/clients`;
  constructor(private httpClient: HttpClient) {}

  getByCollectionId(id: number) {
    return this.httpClient.get<any>(`${this.apiUrl}/collection/${id}`);
  }
  uploadClientFile(collectionId: string, userId: string, jsonFile: File) {
    const formData: FormData = new FormData();
    formData.append('collectionId', collectionId);
    formData.append('userId', userId);
    formData.append('jsonFile', jsonFile, jsonFile.name);

    const headers = new HttpHeaders({
      enctype: 'multipart/form-data',
    });

    return this.httpClient.post(`${this.apiUrl}`, formData, { headers });
  }
  assingClientsToUsers(body: any) {
    return this.httpClient.patch<any>(
      `${this.apiUrl}/assignClientsToUsers`,
      body
    );
  }
}
