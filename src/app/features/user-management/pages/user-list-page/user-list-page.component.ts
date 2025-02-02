import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserModel } from '../../models/userModel';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItemGroup } from 'primeng/api';
import { OpportunityService } from '../../../opportunities/services/opportunityService';
import { DeleteUserDialogComponent } from '../../components/delete-user-dialog/delete-user-dialog.component';
@Component({
  selector: 'app-user-list-page',
  standalone: true,
  providers: [DialogService],
  imports: [TableModule, ButtonModule],
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.css',
})
export class UserListPageComponent {
  groupedUsers!: SelectItemGroup[];

  users!: UserModel[];
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
