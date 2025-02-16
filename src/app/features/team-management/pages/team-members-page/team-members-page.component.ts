import { Component, OnInit } from '@angular/core';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { UserService } from '../../../user-management/services/userService';
import { UserModel } from '../../../user-management/models/userModel';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
@Component({
  selector: 'app-team-members-page',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    OverlayPanelModule,
  ],
  templateUrl: './team-members-page.component.html',
  styleUrl: './team-members-page.component.css',
})
export class TeamMembersPageComponent {
  users!: UserModel[];
  noTeamExecutives!: UserModel[];
  teamId!: number;
  selectedExecutive!: UserModel;
  constructor(
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.teamId = Number(
      this.sessionStorageService.getItem(SESSION_ITEMS.TEAM_ID)
    );
    this.loadUsers();
  }

  loadUsers() {
    if (this.teamId) {
      this.userService.getUsersByTeamId(this.teamId).subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  loadExecutivosWithNoTeam() {
    this.userService.getExecutivesWithoutTeam().subscribe({
      next: (response) => {
        this.noTeamExecutives = response;
      },
    });
  }

  onRowSelect(op: OverlayPanel, user: any) {
    console.log(this.selectedExecutive);
    this.setUserTeam(user.id, this.teamId);
    op.hide();
  }

  confirmRemove(event: Event, user: any) {
    if (user.id !== undefined) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Seguro que quiere remover a ${user.firstName} ${user.lastName} del equipo?`,
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          if (user.id !== undefined) {
            this.setUserTeam(user.id, null);
          }
        },
        reject: () => {},
      });
    }
  }

  setUserTeam(userId: number, teamId?: number | null) {
    this.userService.updateUserTeam(userId, { teamId }).subscribe({
      next: () => {
        if (!teamId) {
          this.users = this.users.filter((user) => user.id !== userId);
        } else {
          this.users.push(this.selectedExecutive);
        }
      },
    });
  }
}
