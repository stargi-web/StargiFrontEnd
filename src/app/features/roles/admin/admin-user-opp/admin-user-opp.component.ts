import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpportunityModel } from '../../../../core/models/opportunityModel';
import { OpportunityService } from '../../../../core/services/nestjs-services/opportunityService';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OpportunityRecordService } from '../../../../core/services/nestjs-services/opportunityRecordService';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExecutiveRecordsOppDialogComponent } from '../../executive/executive-records-opp-dialog/executive-records-opp-dialog.component';
import { ConfirmDeleteOpportunityDialogComponent } from '../../../../shared/components/confirm-delete-opportunity-dialog/confirm-delete-opportunity-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import {
  opportunityTypes,
  products,
  productTypes,
  states,
} from '../../../../shared/const/constantes';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../../core/services/nestjs-services/userService';
import { SelectItemGroup } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'app-admin-user-opp',
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
  ],
  templateUrl: './admin-user-opp.component.html',
  styleUrl: './admin-user-opp.component.css',
})
export class AdminUserOppComponent implements OnInit {
  assignUserMode = false;
  indexAssignUserMode = 0;
  groupedUsers!: SelectItemGroup[];
  selectedUser!: any;
  editingRowIndex: number | null = null;
  urgentOpportunitiesCount: number = 0;
  sort = -1;
  private readonly NEAR_CLOSING_DAYS = 7;
  opportunities!: OpportunityModel[];
  loading = true;
  userId?: number;
  opportunityTypes = opportunityTypes;
  products = products;
  productTypes = productTypes;
  states = states;
  opportunityStateSummary: { sigla: string; count: number }[] = [];
  totalOpportunities = 0;
  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private opportunityService: OpportunityService,
    private oppRecordService: OpportunityRecordService
  ) {}
  ref: DynamicDialogRef | undefined;
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
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
    if (this.userId)
      this.opportunityService.getOpportunitiesByUserId(this.userId).subscribe({
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
          this.calculateOpportunityStateSummary();
          this.loading = false;
        },
        error: (error) => console.error(error),
      });
  }
  enableEditUserMode(index: number) {
    this.assignUserMode = true;
    this.indexAssignUserMode = index;
  }
  disableEditUserMode() {
    this.assignUserMode = false;
  }
  changeUser(userId: number, oppId: number) {
    this.opportunityService
      .changeUser({ userId: userId, opportunityId: oppId })
      .subscribe({
        next: (response) => {
          alert(response.message);
        },
        error: (error) => console.error(error),
      });
    this.assignUserMode = false;
  }
  isNearClosingDate(opportunity: OpportunityModel): boolean {
    const today = new Date(); // Fecha actual
    const closingDate = new Date(opportunity.estimatedClosingDate);

    const diffInTime = closingDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    return diffInDays <= this.NEAR_CLOSING_DAYS;
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
      userId: Number(sessionStorage.getItem('userId')),
    };

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
