import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderStorageService } from '../../../../services/folderStorageService'; // Importamos el servicio
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
import { FirebaseCloudStorageService } from '../../../../services/firebaseCloudStorage';

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

  //admin
  selectedFolderAdmin: any;

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
    private firebaseCloudStorageService: FirebaseCloudStorageService,
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
    this.selectedFolder = undefined;
    this.userService.getUsersIncludingAdmins().subscribe((users: any[]) => {
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
    this.selectedFolderAdmin = undefined;
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
    const filePath = `users/${this.userId}/files/${
      this.folderHistory[this.folderHistory.length - 1].path
    }/${file.fileName}`; // Ruta completa del archivo en Firebase Storage

    // Obtener la URL de descarga
    this.firebaseCloudStorageService.getFileUrl(filePath).subscribe(
      (response) => {
        const downloadURL = response.url;

        // Abrir el archivo en una nueva pestaña
        const newTab = window.open(downloadURL, '_blank');

        if (newTab) {
          newTab.focus();
        } else {
          console.error('No se pudo abrir la nueva pestaña');
        }
      },
      (error) => {
        console.error('Error al obtener la URL de descarga: ', error);
      }
    );
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
    const folderPath = `users/${this.userId}/files/${
      this.folderHistory[this.folderHistory.length - 1].path
    }`;
    this.totalFiles = this.newFileList.length;

    // Llamar al servicio para subir los archivos
    this.firebaseCloudStorageService
      .uploadFiles(this.newFileList, folderPath)
      .subscribe(
        (response) => {
          // Procesar URLs de archivos subidos
          response.urls.forEach((url, index) => {
            // Asumimos que el nombre de archivo se extrae desde el URL o algo similar
            const fileName = this.newFileList[index].name;
            this.createFile(
              fileName,
              this.newFileList[index].size,
              this.newFileList[index].type
            );

            this.completedUploads++;

            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: `Archivo ${fileName} subido con éxito.`,
            });
          });
        },
        (error) => {
          console.error('Error al subir los archivos:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al subir los archivos.`,
          });
        }
      );
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
        this.deleteFirebaseFile(
          `users/${this.userId}/files/${this.selectedFile.filePath}`
        );
        this.selectedFile = undefined;
        this.isFileSelected = false;
      },
      error: (error) => {
        console.error('Error deleting file:', error);
      },
    });
  }

  deleteFirebaseFile(path: string): void {
    this.firebaseCloudStorageService.deleteFile(path).subscribe(
      (response) => {
        // Maneja la respuesta exitosa (puedes mostrar un mensaje al usuario, por ejemplo)
        console.log(response.message);
      },
      (error) => {
        // Maneja el error si ocurre
        console.error('Error al eliminar el archivo: ', error);
        // Aquí puedes agregar un mensaje de error al usuario si es necesario
      }
    );
  }

  async deleteFolder(folder: Folder): Promise<void> {
    if (
      !folder ||
      !confirm(`¿Estás seguro de eliminar la carpeta ${folder.name}?`)
    ) {
      return;
    }

    try {
      const folderPath = `users/${this.userId}/files/${folder.path}`;
      await this.deleteFirebaseFolder(folderPath);

      // Delete folder from database
      this.folderService.deleteFolder(folder.id).subscribe({
        next: () => {
          // Refresh folder list
          if (this.folderHistory.length > 0) {
            this.loadChildrenFolders(
              this.folderHistory[this.folderHistory.length - 1].id
            );
            this.selectedFolder = undefined;
          } else {
            this.loadParentFolders(this.userId);
            this.selectedFolder = undefined;
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

  private deleteFirebaseFolder(folderPath: string): void {
    this.firebaseCloudStorageService.deleteFolder(folderPath).subscribe(
      (response) => {
        // Maneja la respuesta (por ejemplo, muestra un mensaje de éxito)
        console.log(response.message);
      },
      (error) => {
        // Maneja cualquier error que ocurra
        console.error('Error al eliminar la carpeta: ', error);
      }
    );
  }

  selectAdminFolder(folder: any): void {
    this.selectedFolderAdmin = folder;
  }
}
