import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../../user-management/services/userService';
import { UserModel } from '../../../user-management/models/userModel';
import { CommonModule } from '@angular/common';
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
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.teamId = Number(sessionStorage.getItem('teamId'));
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
