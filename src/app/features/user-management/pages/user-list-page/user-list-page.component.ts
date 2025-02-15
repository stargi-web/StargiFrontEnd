import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserModel } from '../../models/userModel';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectItemGroup } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-user-list-page',
  standalone: true,
  providers: [],
  imports: [TableModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.css',
})
export class UserListPageComponent {
  groupedUsers!: SelectItemGroup[];

  users!: UserModel[];
  constructor(
    private userService: UserService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.groupedUsers = [
      {
        label: 'Ejecutivos',
        value: 'executives',
        items: [],
      },
      {
        label: 'Supervisores',
        value: 'supervisors',
        items: [],
      },
    ];
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
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
      },
      error: (error) => console.error(error),
    });
  }
  viewOpportunities(userId: number) {
    this.router.navigate([`/opportunities/user/${userId}`]);
  }

  confirmDelete(event: Event, user: any) {
    if (user.id !== undefined) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Seguro que quiere eliminar a ${user.firstName} ${user.lastName}?`,
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          if (user.id !== undefined) {
            this.deleteUser(user.id);
          }
        },
        reject: () => {},
      });
    }
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
      },
    });
  }
}
