import { Component, OnInit } from '@angular/core';
import { TeamCardModel } from '../../models/teamCardModel';
import { TeamService } from '../../services/teamService';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../user-management/services/userService';
import { UserModel } from '../../../user-management/models/userModel';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list-page',
  standalone: true,
  imports: [CardModule, TableModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './team-list-page.component.html',
  styleUrl: './team-list-page.component.css',
})
export class TeamListPageComponent {
  editingRowIndex: number | null = null;
  supervisors?: UserModel[];
  selectedSupervisor?: UserModel;
  teams!: TeamCardModel[];

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe({
      next: (response) => {
        this.teams = response;
      },
      error: (error) => console.error(error),
    });
    this.userService.getUsersByRole('supervisor').subscribe({
      next: (response) => {
        this.supervisors = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  assignLeader() {
    throw new Error('Method not implemented.');
  }
  startEditing(rowIndex: number) {
    this.editingRowIndex = rowIndex;
  }
  cancelEditing() {
    this.editingRowIndex = null;
  }
  saveChanges(teamId: number) {
    if (this.selectedSupervisor) {
      this.teamService
        .assignLeader({ leaderId: this.selectedSupervisor.id, teamId: teamId })
        .subscribe({
          next: (response) => {
            this.editingRowIndex = null;
            window.location.reload();
          },
          error: (error) => console.error(error),
        });
    }
  }
  openTeamOppView(teamId: number) {
    this.router.navigate([`/opportunities/team/${teamId}`]);
  }
}
