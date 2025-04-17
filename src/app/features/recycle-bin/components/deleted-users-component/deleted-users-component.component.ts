import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { UserService } from '../../../user-management/services/userService';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-deleted-users-component',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    PaginatorModule,
    ConfirmDialogModule,
  ],
  templateUrl: './deleted-users-component.component.html',
  styleUrl: './deleted-users-component.component.css',
})
export class DeletedUsersComponentComponent {
  deletedUsers: any[] = []; // Aquí deberías definir el tipo de datos correcto
  paginateddeletedUsers: any[] = [];
  first: number = 0;
  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userService.getUsersDeleted().subscribe((response) => {
      this.deletedUsers = response;
      this.updatePage();
    });
  }

  updatePage() {
    this.paginateddeletedUsers = this.deletedUsers.slice(
      this.first,
      this.first + 6
    );
  }
  onPageChange(event: any) {
    this.first = event.first; // Actualiza el índice del primer elemento
    this.updatePage(); // Actualiza las encuestas visibles
  }

  confirmRestore(event: Event, survey: any) {
    if (survey.id !== undefined) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro que quiere restaurar este usuario?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          if (survey.id !== undefined) {
            this.restoreUser(survey.id);
          }
        },
        reject: () => {},
      });
    }
  }

  restoreUser(userId: number) {
    this.userService.restoreUser(userId).subscribe({
      next: () => {
        this.deletedUsers = this.deletedUsers.filter(
          (user) => user.id !== userId
        );
        this.updatePage();
      },
      error: (error) => {
        console.error('Error al restaurar el usuario:', error);
      },
    });
  }
}
