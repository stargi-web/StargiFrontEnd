import { InputNumberModule } from 'primeng/inputnumber';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OpportunityService } from '../../../services/nestjs-services/opportunityService';
import { ExecutiveEditOpportunityComponent } from '../executive-edit-opportunity/executive-edit-opportunity.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExecutiveRecordsOppDialogComponent } from '../executive-records-opp-dialog/executive-records-opp-dialog.component';
import { ConfirmDeleteOpportunityDialogComponent } from '../../../shared/components/confirm-delete-opportunity-dialog/confirm-delete-opportunity-dialog.component';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import {
  opportunityTypes,
  products,
  productTypes,
  states,
} from '../../../shared/const/constantes';
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
  ],
  templateUrl: './executive-dashboard.component.html',
  styleUrl: './executive-dashboard.component.css',
})
export class ExecutiveDashboardComponent implements OnInit {
  private readonly NEAR_CLOSING_DAYS = 7;
  urgentOpportunitiesCount: number = 0;
  opportunities!: OpportunityModel[];
  editingRowIndex: number | null = null;
  loading: boolean = true;
  opportunityTypes = opportunityTypes;
  productTypes = productTypes;
  products = products;
  states = states;
  opportunityStateSummary: { sigla: string; count: number }[] = [];
  totalOpportunities = 0;
  constructor(
    public dialogService: DialogService,
    private opportunityService: OpportunityService
  ) {}
  ref: DynamicDialogRef | undefined;
  ngOnInit(): void {
    this.loadOpportunities();
  }
  calculateOpportunityStateSummary() {
    const stateCounts = {
      'No contactado': 0,
      Potenciales: 0,
      Prospecto: 0,
      'Prospecto calificado': 0,
      'Prospecto desarrollado': 0,
      Cierre: 0,
      'No cierre': 0,
    };

    this.opportunities.forEach((opportunity) => {
      stateCounts[opportunity.state as keyof typeof stateCounts]++;
    });

    this.opportunityStateSummary = [
      { sigla: 'NC', count: stateCounts['No contactado'] },
      { sigla: 'PO', count: stateCounts.Potenciales },
      { sigla: 'PR', count: stateCounts.Prospecto },
      { sigla: 'PC', count: stateCounts['Prospecto calificado'] },
      { sigla: 'PD', count: stateCounts['Prospecto desarrollado'] },
      { sigla: 'C', count: stateCounts.Cierre },
      { sigla: 'NoC', count: stateCounts['No cierre'] },
    ];

    this.totalOpportunities = this.opportunities.length;
  }
  getRowClass(opportunity: any): string {
    const creationDate = new Date(opportunity.oppSfaDateCreation);
    const today = new Date();
    const diffInTime = today.getTime() - creationDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays > 28) {
      return 'overdue-red';
    } else if (diffInDays > 25) {
      return 'overdue-yellow';
    } else {
      return '';
    }
  }
  loadOpportunities() {
    const userId = Number(sessionStorage.getItem('userId'));
    this.opportunityService.getOpportunitiesByUserId(userId).subscribe({
      next: (response) => {
        this.opportunities = response;
        this.loading = false;
        this.opportunities.forEach((opp) => {
          opp.oppSfaDateCreation = new Date(opp.oppSfaDateCreation);
          opp.createdAt = new Date(opp.createdAt);
          opp.updatedAt = new Date(opp.updatedAt);
          opp.estimatedClosingDate = new Date(opp.estimatedClosingDate);
          if (opp.nextInteraction) {
            opp.nextInteraction = new Date(opp.nextInteraction);
          }
        });
        this.calculateUrgentOpportunities();
        this.calculateOpportunityStateSummary();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  isNearClosingDate(opportunity: OpportunityModel): boolean {
    const today = new Date(); // Fecha actual
    const closingDate = new Date(opportunity.estimatedClosingDate);

    const diffInTime = closingDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    return diffInDays <= this.NEAR_CLOSING_DAYS;
  }
  calculateUrgentOpportunities() {
    const today = new Date();
    this.urgentOpportunitiesCount = this.opportunities.filter((opportunity) => {
      const estimatedClosingDate = new Date(opportunity.estimatedClosingDate);
      const timeDiff = estimatedClosingDate.getTime() - today.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return dayDiff <= 5;
    }).length;
  }
  isUrgent(opportunity: OpportunityModel): boolean {
    const today = new Date();
    const estimatedClosingDate = new Date(opportunity.estimatedClosingDate);
    const timeDiff = estimatedClosingDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff <= 5;
  }
  startEditing(rowIndex: number) {
    this.editingRowIndex = rowIndex;
  }

  saveChanges(opportunity: OpportunityModel) {
    const editCommand: any = {
      oppId: opportunity.id!,
      ruc: opportunity.ruc.toString(),
      businessName: opportunity.businessName,
      sfaNumber: opportunity.SfaNumber,
      oppSfaDateCreation: opportunity.oppSfaDateCreation,
      type: opportunity.type,
      product: opportunity.product,
      amount: opportunity.amount!,
      newClosingDate: opportunity.estimatedClosingDate,
      newUnits: opportunity.units,
      newState: opportunity.state,
      newCommentary: opportunity.commentary,
      contactName: opportunity.contactName || '',
      contactNumber: opportunity.contactNumber || '',
      nextInteraction: opportunity.nextInteraction,
      email: opportunity.email,
      userId: Number(sessionStorage.getItem('userId')),
    };

    console.log(editCommand);
    this.opportunityService.editOpportunity(editCommand).subscribe({
      next: (response) => {
        alert(`${response.message}`);
        this.editingRowIndex = null;
        this.loadOpportunities();
      },
      error: (error) => {
        console.error(error);
        this.editingRowIndex = null;
      },
    });
  }

  cancelEditing() {
    this.editingRowIndex = null;
  }
  deleteOpportunity(name: string, id: number) {
    const config = {
      data: {
        bussinesName: name,
      },
      Headers: 'Confimar eliminacion',
    };
    this.ref = this.dialogService.open(
      ConfirmDeleteOpportunityDialogComponent,
      config
    );
    this.ref.onClose.subscribe((response: boolean) => {
      if (response) {
        this.opportunityService.deleteOpportunity(id).subscribe({
          next: (response) => {
            this.opportunities = this.opportunities.filter((o) => o.id !== id);
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    });
  }
  openRecordsDialog(oppId: number) {
    if (this.editingRowIndex == null) {
      const config = {
        data: {
          oppId,
        },
        Headers: 'Historial de cambios',
        with: '60vw',
      };
      this.ref = this.dialogService.open(
        ExecutiveRecordsOppDialogComponent,
        config
      );
    }
  }
}
