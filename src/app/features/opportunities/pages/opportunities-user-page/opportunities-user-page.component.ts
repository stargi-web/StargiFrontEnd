import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { OpportunityService } from '../../services/opportunity.service';
import { OportunityTableComponent } from '../../components/oportunity-table/oportunity-table.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-opportunities-user-page',
  standalone: true,
  imports: [OportunityTableComponent],
  templateUrl: './opportunities-user-page.component.html',
  styleUrl: './opportunities-user-page.component.css',
})
export class OpportunitiesUserPageComponent {
  userId: number = 0;
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
    user: { value: 0 },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId =
      Number(this.route.snapshot.paramMap.get('userId')) ||
      Number(sessionStorage.getItem('userId')) ||
      0;

    this.filters = {
      ...this.filters,
      user: { value: this.userId },
    };
    console.log('Filtros:', this.filters);
  }
}
