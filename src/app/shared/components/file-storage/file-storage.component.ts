import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderStorageService } from '../../../services/folderStorageService'; // Importamos el servicio
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage'; // Usamos el SDK de Firebase
import { Folder } from '../../../core/models/folderStorageModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-storage',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './file-storage.component.html',
  styleUrls: ['./file-storage.component.css']
})
export class FileStorageComponent implements OnInit {

  folders: Folder[] = [];  // Array para almacenar las carpetas
  files: any[] = [];
  selectedFolder: any;
  uploadProgress: number = 0; // Para mostrar el progreso de la carga
  uploadURL: string = ''; // Para almacenar la URL del archivo cargado
  folderHistory: Folder[] = []; // Pila de historial de carpetas
  newFolderName: string = 'xd';

  constructor(private folderService: FolderStorageService, private storage: Storage) { }

  ngOnInit(): void {
    const userId = 61;  // Este sería el ID del usuario, cámbialo por el valor real
    this.folderService.getParentFoldersByUser(userId).subscribe((data : Folder[]) => {
      this.folders = data;  // Asignamos las carpetas principales
    });
  }


    // Cargar carpetas principales
    private loadParentFolders(userId: number): void {
      this.folderService.getParentFoldersByUser(userId).subscribe((data: Folder[]) => {
        this.folders = data;
        this.folderHistory = []; // Limpiar historial al cargar carpetas principales
      });
    }

  // Maneja el clic en una carpeta
  selectFolder(folder: Folder): void {
    this.folderHistory.push(folder); // Agregar la carpeta actual al historial
    this.folderService.getChildrenFoldersByFolderId(folder.id).subscribe((subFolders: Folder[]) => {
      this.folders = subFolders; // Actualizar la vista con las subcarpetas
    });
  }

  // Regresar al nivel anterior
  goBack(): void {
    this.folderHistory.pop(); // Eliminar la carpeta actual del historial
    const previousFolder = this.folderHistory[this.folderHistory.length - 1];

    if (previousFolder) {
      // Si hay una carpeta anterior, cargar sus subcarpetas
      this.folderService.getChildrenFoldersByFolderId(previousFolder.id).subscribe((subFolders: Folder[]) => {
        this.folders = subFolders;
      });
    } else {
      // Si no hay historial, cargar las carpetas principales
      const userId = 61;
      this.loadParentFolders(userId);
    }
  }


  createFolder(): void {
    if (!this.newFolderName.trim()) {
      alert('El nombre de la carpeta no puede estar vacío.');
      return;
    }
  
    const userId = 61;
    // Change null to undefined
    const parentId = this.folderHistory.length > 0 
      ? this.folderHistory[this.folderHistory.length - 1].id 
      : undefined;  // Changed from null to undefined
  
    this.folderService.createFolder(userId, { 
      name: this.newFolderName, 
      parentId 
    }).subscribe({
      next: () => {
        this.newFolderName = '';
        if (parentId) {
          this.selectFolder(this.folderHistory[this.folderHistory.length - 1]);
        } else {
          this.loadParentFolders(userId);
        }
      },
      error: (error) => {
        console.error('Error creating folder:', error);
      }
    });
  }


  // Método para manejar la carga de archivos a Firebase Storage
  uploadFile(event: any): void {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (!file) return; // Si no se seleccionó archivo, salir

    // Crear una referencia única para el archivo en Firebase Storage
    const filePath = `uploads/${file.name}`; // Usamos solo el nombre del archivo (sin uuid)
    const fileRef = ref(this.storage, filePath); // Referencia al archivo en Firebase Storage

    // Subir el archivo
    const uploadTask = uploadBytesResumable(fileRef, file);

    // Observamos el progreso de la carga
    uploadTask.then((snapshot) => {
      this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Cargando... ' + this.uploadProgress + '%');

      // Obtener la URL del archivo después de que se haya subido
      getDownloadURL(fileRef).then((downloadURL) => {
        this.uploadURL = downloadURL; // Guardamos la URL para mostrarla
        console.log('Archivo cargado con éxito. URL: ', downloadURL);
      });
    }).catch((error) => {
      console.error('Error al subir el archivo: ', error);
    });
  }
}
