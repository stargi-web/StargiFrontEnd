import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { OpportunityService } from '../../services/opportunity.service';
import { OportunityTableComponent } from '../../components/oportunity-table/oportunity-table.component';

@Component({
  selector: 'app-opportunities-role-page',
  standalone: true,
  imports: [OportunityTableComponent],
  templateUrl: './opportunities-role-page.component.html',
  styleUrl: './opportunities-role-page.component.css',
})
export class OpportunitiesRolePageComponent {
  groupedUsers!: SelectItemGroup[];
  filters = {
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

  constructor(private opportunityService: OpportunityService) {}

  async ngOnInit(): Promise<void> {
    await this.loadUsers();
    this.filters = await this.opportunityService.getFilters();
    console.log('Filtros:', this.filters);
  }

  async loadUsers() {
    this.groupedUsers = await this.opportunityService.loadUsers();
  }
}
