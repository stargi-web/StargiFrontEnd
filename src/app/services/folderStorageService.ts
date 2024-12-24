import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importamos HttpClient para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Para manejar las respuestas asincrónicas
import { environment } from '../env/environment'; // Asegúrate de tener la URL base de tu API
import { Folder } from '../core/models/folderStorageModel';

@Injectable({
  providedIn: 'root',
})
export class FolderStorageService {
  private apiUrl = `${environment.apiUrl}/folders`; // URL de la API de tu servidor NestJS

  constructor(private http: HttpClient) {}

  // Crear una nueva carpeta
  createFolder(
    userId: number,
    folderData: { name: string; parentId?: number }
  ): Observable<Folder> {
    return this.http.post<Folder>(`${this.apiUrl}`, { userId, ...folderData });
  }

  // Obtener todas las carpetas de un usuario
  getFoldersByUser(userId: number): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Obtener una carpeta por su ID
  getFolderById(id: number): Observable<Folder> {
    return this.http.get<Folder>(`${this.apiUrl}/${id}`);
  }

  getParentFoldersByUser(userId: number): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/parent/user/${userId}`);
  }

  getChildrenFoldersByFolderId(folderId: number): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/children/${folderId}`);
  }

  deleteFolder(folderId: number): Observable<Folder> {
    return this.http.delete<Folder>(`${this.apiUrl}/${folderId}`);
  }
}
