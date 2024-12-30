import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importamos HttpClient para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Para manejar las respuestas asincrónicas
import { environment } from '../../../env/environment'; // Asegúrate de tener la URL base de tu API
import { File } from '../../core/models/fileStorageModel';

@Injectable({
  providedIn: 'root',
})
export class FileStorageService {
  private apiUrl = `${environment.apiUrl}/files`; // URL de la API de tu servidor NestJS

  constructor(private http: HttpClient) {}

  createFile(
    userId: number,
    folderId: number,
    fileData: { fileName: string; fileSize: number; contentType: string }
  ): Observable<File> {
    const body = { userId, folderId, ...fileData };
    return this.http.post<File>(`${this.apiUrl}`, body);
  }

  getFilesByFolder(folderId: number): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/folder/${folderId}`);
  }

  deleteFile(fileId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${fileId}`);
  }
}
