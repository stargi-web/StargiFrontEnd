import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderStorageService } from '../folderService'; // Importamos el servicio
import { Folder } from '../../../core/models/folderStorageModel';
import { FormsModule } from '@angular/forms';
import { FileStorageService } from '../fileService';
import { FileUploadModule } from 'primeng/fileupload';
import { PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../core/services/nestjs-services/userService';
import { BadgeModule } from 'primeng/badge';
import { Button } from 'primeng/button';
import { FirebaseCloudStorageService } from '../../../core/services/external-services/firebaseCloudStorageService';
import { MessageNotificationService } from '../../../shared/components/message-toast/message-toast.service';
import { CustomConfirmDialogComponent } from '../../../shared/components/custom-confirm-dialog/custom-confirm-dialog.component';
import { MessageToastModule } from '../../../shared/components/message-toast/message-toast.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-file-storage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    InputTextModule,
    BadgeModule,
    CustomConfirmDialogComponent,
    MessageToastModule,
    NgxSpinnerModule,
  ],
  templateUrl: './file-storage.component.html',
  styleUrls: ['./file-storage.component.css'],
  providers: [],
})
export class FileStorageComponent implements OnInit {
  folders: Folder[] = []; // Array para almacenar las carpetas
  files: any[] = [];
  selectedFolder: any;
  uploadURL: string = ''; // Para almacenar la URL del archivo cargado
  folderHistory: Folder[] = []; // Pila de historial de carpetas
  newFolderName: string = '';
  userId = Number(sessionStorage.getItem('userId'));

  userName: string = '';
  userRole: string = '';
  adminUsersFolders: any = [];

  //file
  selectedFile: any;
  fileList: FileList = {} as FileList;
  newFileList: File[] = Array.from(this.fileList || []); // Convert FileList to File[]
  uploadedFiles: any[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;

  completedUploads: number = 0;
  totalFiles: number = 0;

  //admin
  selectedFolderAdmin: any;

  @ViewChild('removeUploadedFileButton') removeUploadedFileButton:
    | Button
    | undefined;
  @ViewChild('deleteFolderDialog')
  deleteFolderDialog!: CustomConfirmDialogComponent;
  @ViewChild('deleteFileDialog')
  deleteFileDialog!: CustomConfirmDialogComponent;
  //UI
  isCreatingFolder: boolean = false; // Estado para controlar la visibilidad del input
  isAdminParent: boolean = false;

  constructor(
    private config: PrimeNGConfig,
    private folderService: FolderStorageService,
    private fileService: FileStorageService,
    private userService: UserService,
    private firebaseCloudStorageService: FirebaseCloudStorageService,
    private messageNotificationService: MessageNotificationService
  ) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role') || '';
    console.log('Rol del usuario: ', this.userRole);
    if (this.userRole === 'admin') {
      this.adminLoadAllUserFolders();
      this.isAdminParent = true;
    } else {
      this.userName = sessionStorage.getItem('username') || '';
      this.loadParentFolders(this.userId);
    }
  }

  getBaseFirebasePath(): string {
    return `users/${this.userName}/files`;
  }

  adminLoadAllUserFolders(): void {
    this.deselectFolder();
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

  adminLoadParentFolderByUser(userId: number, username: string): void {
    this.userName = username;
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
    this.selectedFolder = folder; // Actualizar la carpeta seleccionada
    this.selectedFile = undefined;
  }

  deselectFolder(): void {
    this.selectedFolder = undefined;
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
    this.deselectFile();
    this.deselectFolder();
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

    this.folderService
      .createFolder(this.userId, {
        name: this.newFolderName,
        parentId,
        path: parentId
          ? `${this.folderHistory[this.folderHistory.length - 1].path}/${
              this.newFolderName
            }`
          : this.newFolderName,
      })
      .subscribe({
        next: () => {
          this.messageNotificationService.showSuccess(
            `Folder ${this.newFolderName} creado con éxito`
          );
          this.newFolderName = '';
          if (parentId) {
            this.loadChildrenFolders(parentId);
          } else {
            this.loadParentFolders(this.userId);
          }
        },
        error: (error) => {
          this.messageNotificationService.showError(error.error.message);
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
        if (this.completedUploads === this.totalFiles) {
          this.completedUploads = 0;
          this.totalFiles = 0;
          this.loadFiles(this.folderHistory[this.folderHistory.length - 1].id);
        }
        this.removeUploadedFileButton?.onClick.emit();

        this.messageNotificationService.showSuccess(
          `Archivo ${fileName} subido con éxito`
        );
      },
      error: (error) => {
        this.messageNotificationService.showError(error.error.message);
      },
    });
  }

  downloadFile(file: any): void {
    const filePath = `${this.getBaseFirebasePath()}/${
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
    this.selectedFolder = undefined;
  }

  deselectFile() {
    this.selectedFile = undefined;
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
    const folderPath = `${this.getBaseFirebasePath()}/${
      this.folderHistory[this.folderHistory.length - 1].path
    }`;
    this.totalFiles = this.newFileList.length;
    this.completedUploads = 0;
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
          });
        },
        (error) => {
          this.messageNotificationService.showError(
            'Error al subir los archivos.'
          );
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

    this.fileService.deleteFile(file.id).subscribe({
      next: () => {
        this.loadFiles(this.folderHistory[this.folderHistory.length - 1].id);
        this.deleteFirebaseFile(
          `${this.getBaseFirebasePath()}/${this.selectedFile.filePath}`,
          file.fileName
        );
        this.deselectFile();
      },
      error: (error) => {
        this.messageNotificationService.showError(error.error.message);
      },
    });
  }

  deleteFirebaseFile(path: string, fileName: string): void {
    this.firebaseCloudStorageService.deleteFile(path).subscribe(
      (response) => {
        // Maneja la respuesta exitosa (puedes mostrar un mensaje al usuario, por ejemplo)
        console.log(response.message);
        this.messageNotificationService.showSuccess(
          `Archivo ${fileName} eliminado con éxito`
        );
      },
      (error) => {
        this.messageNotificationService.showError(error.error.message);
      }
    );
  }

  async deleteFolder(folder: Folder): Promise<void> {
    if (!folder) {
      return;
    }

    try {
      const folderPath = `${this.getBaseFirebasePath()}/${folder.path}`;
      await this.deleteFirebaseFolder(folderPath, folder.name);

      // Delete folder from database
      this.folderService.deleteFolder(folder.id).subscribe({
        next: () => {
          // Refresh folder list
          if (this.folderHistory.length > 0) {
            this.loadChildrenFolders(
              this.folderHistory[this.folderHistory.length - 1].id
            );
            this.deselectFolder();
          } else {
            this.loadParentFolders(this.userId);
            this.deselectFolder();
          }
        },
        error: (error) => {
          this.messageNotificationService.showError(error.error.message);
        },
      });
    } catch (error) {
      console.error('Error deleting folder from storage:', error);
    }
  }

  private deleteFirebaseFolder(folderPath: string, folderName: string): void {
    this.firebaseCloudStorageService.deleteFolder(folderPath).subscribe(
      (response) => {
        this.messageNotificationService.showSuccess(
          `Carpeta ${folderName} eliminada con éxito`
        );
        // Maneja la respuesta (por ejemplo, muestra un mensaje de éxito)
        console.log(response.message);
      },
      (error) => {
        // Maneja cualquier error que ocurra
        this.messageNotificationService.showError(error.error.message);
      }
    );
  }

  selectAdminFolder(folder: any): void {
    this.selectedFolderAdmin = folder;
  }

  // Show the confirmation dialog for folder deletion
  showDeleteFolderConfirmation(event: Event) {
    this.deleteFolderDialog.open(event);
  }

  // Show the confirmation dialog for file deletion
  showDeleteFileConfirmation(event: Event) {
    this.deleteFileDialog.open(event);
  }

  // Handle the folder deletion
  handleDeleteFolder() {
    this.deleteFolder(this.selectedFolder);
  }

  // Handle the file deletion
  handleDeleteFile() {
    this.deleteFile(this.selectedFile);
  }

  handleReject(): void {}

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'pi-file-pdf';
      case 'doc':
      case 'docx':
        return 'pi-file-word';
      case 'xls':
      case 'xlsx':
        return 'pi-file-excel';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'pi-image';
      default:
        return 'pi-file';
    }
  }
}
