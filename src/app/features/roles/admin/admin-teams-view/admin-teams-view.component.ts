import { Component, OnInit } from '@angular/core';
import { TeamCardModel } from '../../../../core/models/teamCardModel';
import { TeamService } from '../../../../core/services/nestjs-services/teamService';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../user-management/services/userService';
import { UserModel } from '../../../user-management/models/userModel';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-teams-view',
  standalone: true,
  imports: [CardModule, TableModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './admin-teams-view.component.html',
  styleUrl: './admin-teams-view.component.css',
})
export class AdminTeamsViewComponent implements OnInit {
  editingRowIndex: number | null = null;
  supervisors?: UserModel[];
  selectedSupervisor?: UserModel;
  teams!: TeamCardModel[];
  loading = true;
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
        this.loading = false;
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
