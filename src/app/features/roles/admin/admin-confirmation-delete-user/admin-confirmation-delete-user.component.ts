import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user-management/services/userService';
import { OpportunityService } from '../../../opportunities/services/opportunityService';
import { SelectItemGroup } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
//TODO not used yet
@Component({
  selector: 'app-admin-confirmation-delete-user',
  standalone: true,
  imports: [ButtonModule, DropdownModule, FormsModule],
  templateUrl: './admin-confirmation-delete-user.component.html',
  styleUrl: './admin-confirmation-delete-user.component.css',
})
export class AdminConfirmationDeleteUserComponent implements OnInit {
  groupedUsers!: SelectItemGroup[];
  userId!: number;
  selectedUser!: any;
  constructor(
    private ref: DynamicDialogRef,
    private userService: UserService,
    private oppService: OpportunityService,
    private config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    this.userId = this.config.data?.userId;
    this.groupedUsers = this.config.data?.groupedUsers;
    this.groupedUsers.forEach((group) => {
      group.items = group.items.filter((item) => item.value !== this.userId);
    });
  }
  changeAllOppToNewUser(newUserId: number) {
    this.oppService
      .changeAllOppToNewUser({ userId: this.userId, newUserId })
      .pipe(switchMap(() => this.userService.deleteUser(this.userId)))
      .subscribe({
        next: (response) => {
          alert('Asignación y eliminación exitosa');
          this.ref.close();
        },
        error: (error) => console.error(error),
      });
  }
}
