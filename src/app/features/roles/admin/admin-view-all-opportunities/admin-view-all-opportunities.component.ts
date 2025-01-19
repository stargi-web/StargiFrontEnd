import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OpportunityModel } from '../../../../core/models/opportunityModel';

import { UserService } from '../../../../core/services/nestjs-services/userService';

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
  userId?: number;
  filters: any = {
    isCurrent: { value: true },
    state: {
      value: [
        'Potenciales',
        'Prospecto',
        'Prospecto calificado',
        'Prospecto desarrollado',
      ],
    },
  };
  constructor(
    private userService: UserService,
    public dialogService: DialogService
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
  }

  toggleViewDeletedInParent(isViewDeleted: boolean) {
    if (isViewDeleted) {
      this.loadUsers();
      this.filters = {
        isCurrent: { value: false },
      };
    } else {
      this.loadUsers();
      this.filters = {
        isCurrent: { value: true },
        state: {
          value: [
            'Potenciales',
            'Prospecto',
            'Prospecto calificado',
            'Prospecto desarrollado',
          ],
        },
      };
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
}
