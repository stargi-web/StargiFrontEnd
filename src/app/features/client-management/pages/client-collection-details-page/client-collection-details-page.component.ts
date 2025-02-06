import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/clientService';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService, SelectItemGroup } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../user-management/services/userService';
@Component({
  selector: 'app-client-collection-details-page',
  standalone: true,
  imports: [
    TableModule,
    FileUploadModule,
    ToastModule,
    CommonModule,
    InputNumberModule,
    FormsModule,
    MultiSelectModule,
  ],
  templateUrl: './client-collection-details-page.component.html',
  styleUrl: './client-collection-details-page.component.css',
})
export class ClientCollectionDetailsPageComponent {
  groupedUsers!: SelectItemGroup[];
  uploadedFiles: any[] = [];
  disable = false;
  cols!: any[];
  clients: any[] = [];
  loading = true;
  collectionId!: number;
  userId!: number;
  editMode = false;
  users: any[] = [];
  selectedUsers: any[] = [];
  clientCount = 0;
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private messageService: MessageService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.collectionId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = Number(sessionStorage.getItem('userId'));

    this.clientService
      .getByCollectionId(this.collectionId)
      .subscribe((data: any[]) => {
        this.clients = data;
        data.length === 0
          ? (this.cols = [])
          : (this.cols = this.getColumns(data[0].dataInfo));

        this.loading = false;
      });
    this.groupedUsers = [
      {
        label: 'Ejecutivos',
        value: 'executives',
        items: [],
      },
      {
        label: 'Supervisores',
        value: 'supervisor',
        items: [],
      },
    ];
    this.userService.getUsers().subscribe({
      next: (response) => {
        response.map((user: any) => {
          if (user.role === 'executive') {
            this.groupedUsers[0].items.push({
              label: `${user.firstName} ${user.lastName}`,
              value: user.id,
            });
          } else {
            this.groupedUsers[1].items.push({
              label: `${user.firstName} ${user.lastName}`,
              value: user.id,
            });
          }
        });
        console.log(this.groupedUsers);
      },
      error: (error) => console.error(error),
    });
  }
  getColumns(dataInfo: any): any[] {
    const dynamicCols = Object.keys(dataInfo).map((key) => ({
      field: `dataInfo.${key}`,
      header: key,
    }));

    return [
      { field: 'id', header: 'ID' },
      { field: 'stage', header: 'Estado' },
      ...dynamicCols,
    ];
  }
  onBasicUploadAuto(event: any) {
    this.disable = true;
    const file = event.files[0];
    const collectionId = this.collectionId.toString();
    const userId = this.userId.toString();
    this.clientService.uploadClientFile(collectionId, userId, file).subscribe(
      (response) => {
        console.log('File uploaded successfully', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error uploading file', error);
      }
    );
  }
  toggleEditMode() {
    this.editMode = true;
  }

  cancelEditMode() {
    this.editMode = false;
    this.clientCount = 0;
    this.selectedUsers = [];
  }
  assignClients() {
    if (this.selectedUsers.length === 0 || this.clientCount <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar usuarios y cantidad de clientes',
      });
      return;
    }

    const body = {
      collectionId: this.collectionId.toString(),
      clientCount: this.clientCount,
      userIds: this.selectedUsers,
    };
    this.clientService.assingClientsToUsers(body).subscribe(
      (response) => {
        console.log('Clients assigned successfully', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Clientes asignados correctamente',
        });
        this.cancelEditMode();
      },
      (error) => {
        console.error('Error assigning clients', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un problema al asignar los clientes',
        });
      }
    );
  }
}
