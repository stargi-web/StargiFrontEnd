import { OpportunityService } from '../../../../core/services/nestjs-services/opportunityService';
import { OpportunityModel } from '../../../../core/models/opportunityModel';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { OportunityTableComponent } from '../../../../shared/components/oportunity-table/oportunity-table.component';
import { SelectItemGroup } from 'primeng/api';
import { UserService } from '../../../../core/services/nestjs-services/userService';
@Component({
  selector: 'app-supervisor-team-opportunities',
  standalone: true,
  providers: [DialogService],
  imports: [
    CalendarModule,
    InputTextModule,
    TableModule,
    CommonModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OportunityTableComponent,
  ],
  templateUrl: './supervisor-team-opportunities.component.html',
  styleUrl: './supervisor-team-opportunities.component.css',
})
export class SupervisorTeamOpportunitiesComponent implements OnInit {
  opportunities!: OpportunityModel[];
  groupedUsers!: SelectItemGroup[];
  teamId!: number;

  constructor(
    private userService: UserService,
    private opportunityService: OpportunityService
  ) {}
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.groupedUsers = [
      {
        label: 'Ejecutivos',
        value: 'executives',
        items: [],
      },
      {
        label: 'Supervisores',
        value: 'supervisor',
        items: [],
      },
    ];
    this.teamId = Number(sessionStorage.getItem('teamId'));
    this.loadUsers();
    this.loadOpportunities();
  }

  toggleViewDeletedInParent(isViewDeleted: boolean) {
    if (isViewDeleted) {
      this.loadUsers();
      this.loadDeletedOpportunities();
    } else {
      this.loadUsers();
      this.loadOpportunities();
    }
  }
  loadUsers() {
    this.userService.getUsersByTeamId(this.teamId).subscribe({
      next: (response) => {
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
  loadOpportunities() {
    if (this.teamId) {
      this.opportunityService.getOpportunitiesByTeamId(this.teamId).subscribe({
        next: (response) => {
          this.opportunities = response;
          this.opportunities.forEach((opp) => {
            opp.oppSfaDateCreation = new Date(opp.oppSfaDateCreation);
            opp.createdAt = new Date(opp.createdAt);
            opp.updatedAt = new Date(opp.updatedAt);
            opp.estimatedClosingDate = new Date(opp.estimatedClosingDate);
            if (opp.nextInteraction) {
              opp.nextInteraction = new Date(opp.nextInteraction);
            }
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  loadDeletedOpportunities() {
    this.opportunityService
      .getOpportunitiesDeletedByTeamId(this.teamId)
      .subscribe({
        next: (response) => {
          this.opportunities = response;
        },
        error: (error) => console.error(error),
      });
  }
}
