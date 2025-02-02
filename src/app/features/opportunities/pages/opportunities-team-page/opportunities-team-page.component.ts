import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { OpportunityService } from '../../services/opportunity.service';
import { OportunityTableComponent } from '../../components/oportunity-table/oportunity-table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opportunities-team-page',
  standalone: true,
  imports: [OportunityTableComponent],
  templateUrl: './opportunities-team-page.component.html',
  styleUrl: './opportunities-team-page.component.css',
})
export class OpportunitiesTeamPageComponent {
  teamId: number = 0;
  groupedUsers!: SelectItemGroup[];
  filters = {};

  constructor(
    private opportunityService: OpportunityService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.teamId =
      Number(this.route.snapshot.paramMap.get('teamId')) ||
      this.opportunityService.getCurrentTeamId();

    await this.loadUsers();
    this.filters = await this.opportunityService.getFilters(this.teamId);
  }

  async loadUsers() {
    this.groupedUsers = await this.opportunityService.loadUsers(this.teamId);
  }
}
