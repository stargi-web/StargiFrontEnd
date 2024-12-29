import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../../services/nestjs-services/userService';
import { UserModel } from '../../../core/models/userModel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-supervisor-team-members',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './supervisor-team-members.component.html',
  styleUrl: './supervisor-team-members.component.css',
})
export class SupervisorTeamMembersComponent implements OnInit {
  users!: UserModel[];
  loading = true;
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
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
