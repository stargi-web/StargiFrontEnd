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
  groupedUsers!: SelectItemGroup[];
  teamId!: number;
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

  constructor(private userService: UserService) {}
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
    this.teamId = 5;
    this.loadUsers();
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

        // Extract user IDs
        const userIds = response.map((user: any) => user.id);

        // Crear el objeto de filtros combinados
        console.log('XDDXXDXD');
        this.filters = {
          ...this.filters,
          user: { value: userIds },
        };
      },
      error: (error) => console.error(error),
    });
  }
}
