import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OpportunityModel } from '../../../../core/models/opportunityModel';
import { OpportunityRecordService } from '../../../../core/services/nestjs-services/opportunityRecordService';
import { OpportunityService } from '../../../../core/services/nestjs-services/opportunityService';
import { UserService } from '../../../../core/services/nestjs-services/userService';

import {
  opportunityTypes,
  products,
  productTypes,
  states,
} from '../../../../shared/const/constantes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { OportunityTableComponent } from '../../../../shared/components/oportunity-table/oportunity-table.component';

@Component({
  selector: 'app-admin-view-all-opportunities',
  providers: [DialogService],
  standalone: true,
  imports: [
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    InputNumberModule,
    TableModule,
    CommonModule,
    OportunityTableComponent,
  ],
  templateUrl: './admin-view-all-opportunities.component.html',
  styleUrl: './admin-view-all-opportunities.component.css',
})
export class AdminViewAllOpportunitiesComponent implements OnInit {
  groupedUsers!: SelectItemGroup[];
  selectedUser!: any;
  opportunities!: OpportunityModel[];
  userId?: number;
  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private opportunityService: OpportunityService,
    private oppRecordService: OpportunityRecordService
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
    this.userService.getUsers().subscribe({
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
    this.opportunityService.getAllOpportunities().subscribe({
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
      error: (error) => console.error(error),
    });
  }

  loadDeletedOpportunities() {
    this.opportunityService.getAllOpportunitiesDeleted().subscribe({
      next: (response) => {
        this.opportunities = response;
      },
      error: (error) => console.error(error),
    });
  }
}
