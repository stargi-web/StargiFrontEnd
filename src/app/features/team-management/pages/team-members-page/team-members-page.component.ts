import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../../user-management/services/userService';
import { UserModel } from '../../../user-management/models/userModel';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';
@Component({
  selector: 'app-team-members-page',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './team-members-page.component.html',
  styleUrl: './team-members-page.component.css',
})
export class TeamMembersPageComponent {
  users!: UserModel[];

  teamId!: number;
  constructor(
    private userService: UserService,
    private sessionStorageService: SessionStorageService
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
}
