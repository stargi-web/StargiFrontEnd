import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserModel } from '../../../../core/models/userModel';
import { UserService } from '../../../../core/services/nestjs-services/userService';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminConfirmationDeleteUserComponent } from '../admin-confirmation-delete-user/admin-confirmation-delete-user.component';
import { style } from '@angular/animations';
import { SelectItemGroup } from 'primeng/api';
import { OpportunityService } from '../../../../core/services/nestjs-services/opportunityService';
import { DeleteUserDialogComponent } from '../../../../shared/components/delete-user-dialog/delete-user-dialog.component';
@Component({
  selector: 'app-admin-users-view',
  standalone: true,
  providers: [DialogService],
  imports: [TableModule, ButtonModule],
  templateUrl: './admin-users-view.component.html',
  styleUrl: './admin-users-view.component.css',
})
export class AdminUsersViewComponent implements OnInit {
  groupedUsers!: SelectItemGroup[];

  users!: UserModel[];
  loading = true;
  constructor(
    public dialogService: DialogService,
    private userService: UserService,
    private router: Router,
    private oppService: OpportunityService
  ) {}
  ref: DynamicDialogRef | undefined;

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
        this.loading = false;
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
    this.router.navigate([`/admin/users-opp/${userId}`]);
  }

  deleteUser(userId: number, groupedUsers: any) {
    const config = {
      data: {
        userId,
      },
      style: {
        height: '800px',
      },
    };
    this.ref = this.dialogService.open(DeleteUserDialogComponent, config);
  }
}
