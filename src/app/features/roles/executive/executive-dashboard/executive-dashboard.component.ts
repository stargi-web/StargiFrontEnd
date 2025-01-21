import { InputNumberModule } from 'primeng/inputnumber';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OpportunityModel } from '../../../../core/models/opportunityModel';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

import { SelectItemGroup } from 'primeng/api';
import { OportunityTableComponent } from '../../../../shared/components/oportunity-table/oportunity-table.component';
@Component({
  selector: 'app-executive-dashboard',
  providers: [DialogService],
  standalone: true,
  imports: [
    CalendarModule,
    InputNumberModule,
    TableModule,
    DropdownModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    OportunityTableComponent,
  ],
  templateUrl: './executive-dashboard.component.html',
  styleUrl: './executive-dashboard.component.css',
})
export class ExecutiveDashboardComponent implements OnInit {
  groupedUsers!: SelectItemGroup[];
  userId!: number;
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
    user: { value: 0 },
  };

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.filters = {
      ...this.filters,
      user: { value: this.userId },
    };
  }
}
