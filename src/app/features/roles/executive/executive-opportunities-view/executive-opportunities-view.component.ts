import { Component, OnInit } from '@angular/core';
import { OpportunityModel } from '../../../../core/models/opportunityModel';
import { CommonModule } from '@angular/common';
import { OpportunityService } from '../../../../core/services/nestjs-services/opportunityService';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { OpportunityFilters } from '../../../../core/models/filters';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ActivatedRoute } from '@angular/router';
interface SelectedOptions {
  value: string;
  label: string;
}
@Component({
  selector: 'app-executive-opportunities-view',
  standalone: true,
  imports: [
    CommonModule,
    InputNumberModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    MultiSelectModule,
  ],
  templateUrl: './executive-opportunities-view.component.html',
  styleUrl: './executive-opportunities-view.component.css',
})
export class ExecutiveOpportunitiesViewComponent implements OnInit {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  opportunities!: OpportunityModel[];
  pageSizeOptions = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
  ];
  filters: OpportunityFilters = {};
  role!: string;
  stateOptions = [
    { label: 'No contactado', value: 'No contactado' },
    { label: 'Potenciales', value: 'Potenciales' },
    { label: 'Prospecto', value: 'Prospecto' },
    { label: 'Prospecto calificado', value: 'Prospecto calificado' },
    { label: 'Prospecto desarrollado', value: 'Prospecto desarrollado' },
    { label: 'Cierre', value: 'Cierre' },
    { label: 'No cierre', value: 'No cierre' },
  ];
  selectedOptions?: SelectedOptions[];
  constructor(
    private opportunityService: OpportunityService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.role = this.route.snapshot.url[0]?.path || '';
    this.loadOpportunities();
  }
  updatePage() {
    this.loadOpportunities();
  }
  loadOpportunities() {
    const userId = Number(sessionStorage.getItem('userId'));
    const teamId = Number(sessionStorage.getItem('teamId'));
    const filters = this.filters;

    if (this.role === 'executive') {
      // Llamada para el rol "executive"
      this.opportunityService
        .getOpportunitiesByUserIdPaginatedAndFiltered(
          userId,
          this.currentPage,
          this.pageSize,
          filters
        )
        .subscribe({
          next: (response) => {
            this.totalPages = response.totalPages;
            this.opportunities = response.data;
          },
        });
    } else if (this.role === 'supervisor') {
      if (teamId) {
        // Si existe "teamId" en el sessionStorage
        this.opportunityService
          .getOpportunitiesByTeamIdPaginatedAndFiltered(
            teamId,
            this.currentPage,
            this.pageSize,
            filters
          )
          .subscribe({
            next: (response) => {
              this.totalPages = response.totalPages;
              this.opportunities = response.data;
            },
          });
      } else {
        // Si no existe "teamId", usar el endpoint de "executive"
        this.opportunityService
          .getOpportunitiesByUserIdPaginatedAndFiltered(
            userId,
            this.currentPage,
            this.pageSize,
            filters
          )
          .subscribe({
            next: (response) => {
              this.totalPages = response.totalPages;
              this.opportunities = response.data;
            },
          });
      }
    } else if (this.role === 'admin') {
      // Llamada para el rol "admin"
      this.opportunityService
        .getAllOpportunitiesPaginated(this.currentPage, this.pageSize, filters)
        .subscribe({
          next: (response) => {
            this.totalPages = response.totalPages;
            this.opportunities = response.data;
          },
        });
    }
  }
  applyFilters() {
    const filtersToApply: OpportunityFilters = {};

    if (this.filters.ruc && this.filters.ruc.trim() !== '') {
      filtersToApply.ruc = this.filters.ruc;
    }

    if (this.filters.businessName && this.filters.businessName.trim() !== '') {
      filtersToApply.businessName = this.filters.businessName;
    }
    if (this.selectedOptions && this.selectedOptions.length > 0) {
      filtersToApply.state = this.selectedOptions.map((option) => option.value);
    }

    this.filters = filtersToApply;
    this.currentPage = 1;
    this.loadOpportunities();
  }
}
