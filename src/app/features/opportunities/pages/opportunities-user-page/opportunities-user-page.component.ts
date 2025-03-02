import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { OpportunityService } from '../../services/opportunity.service';
import { OportunityTableComponent } from '../../components/oportunity-table/oportunity-table.component';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';
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
  filters = {};

  constructor(
    private route: ActivatedRoute,
    private opportunityService: OpportunityService,
    private sessionStorageService: SessionStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId =
      Number(this.route.snapshot.paramMap.get('userId')) ||
      Number(this.sessionStorageService.getItem(SESSION_ITEMS.USER_ID)) ||
      0;

    this.filters = await this.opportunityService.getSoloFilters(this.userId);
    console.log('Filtros:', this.filters);
  }
}
