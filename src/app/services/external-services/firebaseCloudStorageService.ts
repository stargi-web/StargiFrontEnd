import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importamos HttpClient para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Para manejar las respuestas asincrónicas
import { environment } from '../../env/environment'; // Asegúrate de tener la URL base de tu API

@Injectable({
  providedIn: 'root',
})
export class FirebaseCloudStorageService {
  private apiUrl = `${environment.apiUrl}/firebase-storage`; // URL de la API de tu servidor NestJS

  constructor(private http: HttpClient) {}

  // Subir archivos
  uploadFiles(
    files: globalThis.File[],
    path: string
  ): Observable<{ urls: string[] }> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file, file.name));
    formData.append('path', path);

    return this.http.post<{ urls: string[] }>(
      `${this.apiUrl}/upload`,
      formData
    );
  }

  // Obtener URL de un archivo
  getFileUrl(path: string): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(`${this.apiUrl}/getFileUrl`, {
      path,
    });
  }

  // Eliminar un archivo
  deleteFile(path: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/file`, {
      body: { path },
    });
  }

  // Eliminar una carpeta
  deleteFolder(path: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/folder`, {
      body: { path },
    });
  }
}
