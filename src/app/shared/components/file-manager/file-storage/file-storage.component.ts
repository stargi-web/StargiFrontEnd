import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderStorageService } from '../../../../services/folderStorageService'; // Importamos el servicio
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from '@angular/fire/storage'; // Usamos el SDK de Firebase
import { Folder } from '../../../../core/models/folderStorageModel';
import { FormsModule } from '@angular/forms';
import { FileStorageService } from '../../../../services/fileStorageService';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../../services/userService';
import { BadgeModule } from 'primeng/badge';
import { Button } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-file-storage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    ToastModule,
    InputTextModule,
    BadgeModule,
    ProgressBarModule,
  ],
  templateUrl: './file-storage.component.html',
  styleUrls: ['./file-storage.component.css'],
  providers: [MessageService],
})
export class FileStorageComponent implements OnInit {
  folders: Folder[] = []; // Array para almacenar las carpetas
  files: any[] = [];
  selectedFolder: any;
  uploadURL: string = ''; // Para almacenar la URL del archivo cargado
  folderHistory: Folder[] = []; // Pila de historial de carpetas
  newFolderName: string = '';
  userId = Number(sessionStorage.getItem('userId'));

  userRole: string = '';
  adminUsersFolders: any = [];

  //file
  isFileSelected: boolean = false;
  selectedFile: any;
  fileList: FileList = {} as FileList;
  newFileList: File[] = Array.from(this.fileList || []); // Convert FileList to File[]
  uploadedFiles: any[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;
  fileUploadProgress: number = 0;

  completedUploads: number = 0;
  totalFiles: number = 0;

  @ViewChild('removeUploadedFileButton') removeUploadedFileButton:
    | Button
    | undefined;

  //UI
  isCreatingFolder: boolean = false; // Estado para controlar la visibilidad del input
  isAdminParent: boolean = false;

  constructor(
    private config: PrimeNGConfig,
    private folderService: FolderStorageService,
    private fileService: FileStorageService,
    private userService: UserService,
    private storage: Storage,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role') || '';
    console.log('Rol del usuario: ', this.userRole);
    if (this.userRole === 'admin') {
      this.adminLoadAllUserFolders();
      this.isAdminParent = true;
    } else {
      this.folderService
        .getParentFoldersByUser(this.userId)
        .subscribe((data: Folder[]) => {
          this.folders = data; // Asignamos las carpetas principales
        });
    }
  }

  adminLoadAllUserFolders(): void {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.adminUsersFolders = users;
      this.isAdminParent = true;
      this.folders = [];
    });
  }

  // Cargar carpetas principales
  loadParentFolders(userId: number): void {
    this.folderService
      .getParentFoldersByUser(userId)
      .subscribe((data: Folder[]) => {
        this.folders = data;
        this.folderHistory = []; // Limpiar historial al cargar carpetas principales
      });
  }

  adminLoadParentFolderByUser(userId: number): void {
    this.folderService
      .getParentFoldersByUser(userId)
      .subscribe((data: Folder[]) => {
        this.folders = data;
        this.folderHistory = []; // Limpiar historial al cargar carpetas principales
        this.isAdminParent = false;
        this.userId = userId;
      });
  }

  private loadFiles(folderId: number): void {
    this.fileService.getFilesByFolder(folderId).subscribe((data: any[]) => {
      this.files = data;
    });
  }

  // Maneja el clic en una carpeta
  selectFolder(folder: Folder): void {
    this.isFileSelected = false; // Deseleccionar archivo
    this.selectedFolder = folder; // Actualizar la carpeta seleccionada
    this.selectedFile = undefined;
  }

  goToFolder(folder: Folder): void {
    this.folderHistory.push(folder); // Agregar la carpeta actual al historial
    this.loadChildrenFolders(folder.id);
    this.loadFiles(folder.id);
    this.selectedFolder = undefined;
  }

  loadChildrenFolders(folderId: number): void {
    this.folderService
      .getChildrenFoldersByFolderId(folderId)
      .subscribe((subFolders: Folder[]) => {
        this.folders = subFolders; // Actualizar la vista con las subcarpetas
      });
  }
  // Regresar al nivel anterior
  goBack(): void {
    this.isFileSelected = false;
    this.selectedFolder = undefined;

    this.folderHistory.pop(); // Eliminar la carpeta actual del historial
    const previousFolder = this.folderHistory[this.folderHistory.length - 1];

    if (previousFolder) {
      // Si hay una carpeta anterior, cargar sus subcarpetas
      this.folderService
        .getChildrenFoldersByFolderId(previousFolder.id)
        .subscribe((subFolders: Folder[]) => {
          this.folders = subFolders;
        });

      this.loadFiles(previousFolder.id);
    } else {
      // Si no hay historial, cargar las carpetas principales
      this.loadParentFolders(this.userId);
      this.files = [];
    }
    this.selectedFile = undefined;
  }

  createFolder(): void {
    if (!this.newFolderName.trim()) {
      alert('El nombre de la carpeta no puede estar vacío.');
      return;
    }

    // Change null to undefined
    const parentId =
      this.folderHistory.length > 0
        ? this.folderHistory[this.folderHistory.length - 1].id
        : undefined; // Changed from null to undefined

    //validar si folder ya existe
    const existingFolder = this.folders.find(
      (folder) =>
        folder.name.toLowerCase() === this.newFolderName.trim().toLowerCase()
    );

    if (existingFolder) {
      alert('Ya existe una carpeta con ese nombre en esta ruta.');
      return;
    }

    this.folderService
      .createFolder(this.userId, {
        name: this.newFolderName,
        parentId,
      })
      .subscribe({
        next: () => {
          this.newFolderName = '';
          if (parentId) {
            this.loadChildrenFolders(parentId);
          } else {
            this.loadParentFolders(this.userId);
          }
        },
        error: (error) => {
          console.error('Error creating folder:', error);
        },
      });
  }

  private createFile(
    fileName: string,
    fileSize: number,
    contentType: string
  ): void {
    // Cambiar null a undefined
    const folderId =
      this.folderHistory.length > 0
        ? this.folderHistory[this.folderHistory.length - 1].id
        : 0;
    // Cambiado de null a undefined

    const fileData = { fileName, fileSize, contentType };

    this.fileService.createFile(this.userId, folderId, fileData).subscribe({
      next: (file) => {
        console.log('File created:', file.fileName);

        if (this.completedUploads === this.totalFiles) {
          this.completedUploads = 0;
          this.totalFiles = 0;
          this.loadFiles(this.folderHistory[this.folderHistory.length - 1].id);
        }
      },
      error: (error) => {
        console.error('Error creating file:', error);
      },
    });
  }

  downloadFile(file: any): void {
    const filePath = `users/${this.userId}/${
      this.folderHistory[this.folderHistory.length - 1].path
    }/${file.fileName}`; // Ruta completa del archivo en Firebase Storage
    const fileRef = ref(this.storage, filePath);

    // Obtener la URL de descarga
    getDownloadURL(fileRef)
      .then((downloadURL) => {
        // Abrir el archivo en una nueva pestaña
        const newTab = window.open(downloadURL, '_blank');

        if (newTab) {
          newTab.focus();
        } else {
          console.error('No se pudo abrir la nueva pestaña');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la URL de descarga: ', error);
      });
  }

  //UI
  selectFile(file: any) {
    this.selectedFile = file;
    this.isFileSelected = true;
  }

  startFolderCreation() {
    this.isCreatingFolder = true;
  }

  // Método que se llama cuando se confirma la creación de la carpeta
  confirmFolderCreation() {
    if (this.newFolderName) {
      // Aquí agregarías el código para crear la carpeta con el nombre dado
      this.isCreatingFolder = false; // Vuelve al estado de solo el botón
      this.createFolder();
      this.newFolderName = ''; // Limpia el valor del nombre
    }
  }

  // Método que se llama cuando se cancela la creación de la carpeta
  cancelFolderCreation() {
    this.isCreatingFolder = false;
    this.newFolderName = ''; // Limpia el valor del nombre
  }

  uploadOnFileSelect(event: any): void {
    this.fileList = event.files; // Get selected files as FileList
    this.newFileList = this.fileList ? Array.from(this.fileList) : [];

    if (!this.newFileList || this.newFileList.length === 0) {
      console.error('No se seleccionaron archivos.');
      return;
    }

    if (!this.folderHistory[this.folderHistory.length - 1]) {
      alert('Debe seleccionar una carpeta para subir los archivos.');
      return;
    }

    // Ruta base en Firebase Storage
    const folderPath = `users/${this.userId}/${
      this.folderHistory[this.folderHistory.length - 1].path
    }`;
    this.totalFiles = this.newFileList.length;

    // Iterar sobre los archivos seleccionados
    this.newFileList.forEach((file: File, index: number) => {
      const filePath = `${folderPath}/${file.name}`;
      // Crear referencia al archivo en Firebase
      const fileRef = ref(this.storage, filePath);

      // Subir archivo
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.fileUploadProgress = Math.round(progress);
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al subir el archivo ${index + 1}.`,
          });
        },
        () => {
          getDownloadURL(fileRef).then((downloadURL) => {
            this.uploadURL = downloadURL;
            this.createFile(file.name, file.size, file.type);

            this.removeUploadedFileButton?.onClick.emit();
            this.fileUploadProgress = 0;
            this.completedUploads++;

            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: `Archivo ${index + 1} subido con éxito.`,
            });
          });
        }
      );
    });
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes?.[0] || 'B'}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes?.[i] || 'B'}`;
  }

  onRemoveTemplatingFile(
    event: any,
    file: { size: number },
    removeFileCallback: (arg0: any, arg1: any) => void,
    index: any
  ) {
    removeFileCallback(event, index);
  }
  choose(event: any, callback: () => void) {
    callback();
  }

  deleteFile(file: any): void {
    if (!file) {
      return;
    }

    if (!confirm(`¿Estás seguro de eliminar el archivo ${file.fileName}?`)) {
      return;
    }

    this.fileService.deleteFile(file.id).subscribe({
      next: () => {
        this.loadFiles(this.folderHistory[this.folderHistory.length - 1].id);
        this.selectedFile = undefined;
      },
      error: (error) => {
        console.error('Error deleting file:', error);
      },
    });
  }

  async deleteFolder(folder: Folder): Promise<void> {
    if (
      !folder ||
      !confirm(`¿Estás seguro de eliminar la carpeta ${folder.name}?`)
    ) {
      return;
    }

    try {
      const folderPath = `users/${this.userId}/${folder.path}`;
      await this.deleteFirebaseFolder(folderPath);

      // Delete folder from database
      this.folderService.deleteFolder(folder.id).subscribe({
        next: () => {
          // Refresh folder list
          if (this.folderHistory.length > 0) {
            this.loadChildrenFolders(
              this.folderHistory[this.folderHistory.length - 1].id
            );
          } else {
            this.loadParentFolders(this.userId);
          }
        },
        error: (error) => {
          console.error('Error deleting folder from database:', error);
        },
      });
    } catch (error) {
      console.error('Error deleting folder from storage:', error);
    }
  }

  private async deleteFirebaseFolder(folderPath: string): Promise<void> {
    const folderRef = ref(this.storage, folderPath);
    const fileList = await listAll(folderRef);

    // Recursively handle all subfolders first
    for (const prefix of fileList.prefixes) {
      await this.deleteFirebaseFolder(prefix.fullPath);
    }

    // Delete all files in current folder
    for (const item of fileList.items) {
      await deleteObject(item);
    }
  }
}