import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OpportunityService } from '../../../core/services/nestjs-services/opportunityService';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { ExecutiveRecordsOppDialogComponent } from '../../../features/roles/executive/executive-records-opp-dialog/executive-records-opp-dialog.component';
import { SimpleChanges } from '@angular/core';
import {
  opportunityTypes,
  products,
  productTypes,
  states,
} from '../../const/constantes';
import { CustomConfirmDialogComponent } from '../custom-confirm-dialog/custom-confirm-dialog.component';

@Component({
  selector: 'app-oportunity-table',
  standalone: true,
  providers: [DialogService],
  imports: [
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    InputNumberModule,
    TableModule,
    CommonModule,
    CheckboxModule,
    CustomConfirmDialogComponent,
  ],
  templateUrl: './oportunity-table.component.html',
  styleUrl: './oportunity-table.component.css',
})
export class OportunityTableComponent {
  opportunities: any[] = [];
  @Input() groupedUsers: any[] = [];
  @Input() filters: Record<string, { value: any | any[] }> = {};
  primeFilters: Record<string, { value: any | any[] }> = {};
  userRole: string = '';

  states = states;
  opportunityTypes = opportunityTypes;
  products = products;
  productTypes = productTypes;
  editingRowIndex: number | null = null;
  assignUserMode: boolean = false;
  indexAssignUserMode: number = -1;
  urgentOpportunitiesCount: number = 0;
  selectedUser: any = null;
  // Métodos necesarios para manejar la lógica del componente
  private readonly NEAR_CLOSING_DAYS = 7;
  selectedOpportunity!: OpportunityModel;

  isViewDeleted: boolean = false;
  isViewClosed: boolean = false;
  totalRecords: number = 0;
  allOpportunities: any[] = [];
  sortField: string = 'createdAt'; // El campo por el cual estás ordenando
  sortOrder: number = -1; // Orden ASC (1) o DESC (-1)
  userIds: any[] = [];
  selectedUsers: any[] = [];

  stateCounts = {
    'No contactado': 0,
    Potenciales: 0,
    Prospecto: 0,
    'Prospecto calificado': 0,
    'Prospecto desarrollado': 0,
    Cierre: 0,
    'No cierre': 0,
  };

  opportunityStateSummary = [
    { sigla: 'NC', count: this.stateCounts['No contactado'] },
    { sigla: 'PO', count: this.stateCounts.Potenciales },
    { sigla: 'PR', count: this.stateCounts.Prospecto },
    { sigla: 'PC', count: this.stateCounts['Prospecto calificado'] },
    { sigla: 'PD', count: this.stateCounts['Prospecto desarrollado'] },
    { sigla: 'C', count: this.stateCounts.Cierre },
    { sigla: 'NoC', count: this.stateCounts['No cierre'] },
  ];

  @ViewChild('deleteOportunityDialog')
  deleteOportunityDialog!: CustomConfirmDialogComponent;
  @ViewChild('dataTable') dataTable: any;
  constructor(
    public dialogService: DialogService,
    private opportunityService: OpportunityService
  ) {}
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role') || '';
    console.log(this.userRole);
    this.loadOpportunities({ first: 0, rows: 10 });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.refreshOpportunityTable();
    }
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
    // Asegurarse de que this.opportunities sea un array válido antes de ejecutar filter
    if (!Array.isArray(this.opportunities)) {
      this.urgentOpportunitiesCount = 0;
      return;
    }
    this.urgentOpportunitiesCount = this.opportunities.filter((opportunity) => {
      // Verificar si estimatedClosingDate existe y tiene un valor válido
      if (!opportunity.estimatedClosingDate) {
        return false; // Si no hay fecha, no contar como urgente
      }

      const estimatedClosingDate = new Date(opportunity.estimatedClosingDate);
      const timeDiff = estimatedClosingDate.getTime() - today.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return dayDiff <= 5; // Considerar oportunidades urgentes si la diferencia de días es menor o igual a 5
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
    this.opportunityService.deleteOpportunity(id).subscribe({
      next: (response) => {
        this.opportunities = this.opportunities.filter((o) => o.id !== id);
      },
      error: (error) => {
        console.error(error);
      },
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

  showDeleteOpportunityDialog(event: Event, opportunity: OpportunityModel) {
    this.selectedOpportunity = opportunity;
    this.deleteOportunityDialog.open(event);
  }
  handleDeleteOportunity() {
    this.deleteOpportunity(
      this.selectedOpportunity.businessName,
      this.selectedOpportunity.id!
    );
  }

  viewClosed() {
    this.isViewClosed = !this.isViewClosed;

    if (this.isViewClosed) {
      this.filters = {
        ...this.filters,
        state: {
          value: ['Cierre', 'No cierre'],
        },
      };
    } else {
      this.filters = {
        ...this.filters,
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
    console.log('CLOSED', this.filters);
    this.refreshOpportunityTable();
  }

  viewDeleted() {
    this.isViewDeleted = !this.isViewDeleted;

    if (this.isViewDeleted) {
      this.filters = {
        ...this.filters,
        isCurrent: { value: false },
      };
    } else {
      this.filters = {
        ...this.filters,
        isCurrent: { value: true },
      };
    }
    this.refreshOpportunityTable();
  }
  parseData(input: any) {
    const parsedResult: any = {};

    // Iteramos sobre las claves del objeto
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        const value = input[key];

        // Si es un array y tiene elementos
        if (
          Array.isArray(value) &&
          value.length > 0 &&
          value[0].hasOwnProperty('value')
        ) {
          const values = value
            .map((item) => item.value)
            .filter((val) => val !== undefined); // Solo filtramos undefined

          // Si hay valores válidos, los asignamos
          if (values.length === 1) {
            parsedResult[key] = { value: values[0] };
          } else if (values.length > 1) {
            parsedResult[key] = { value: values };
          } else {
            parsedResult[key] = { value: null }; // Si no hay valores válidos, asignamos null
          }
        } else {
          // Asignamos el valor, incluso si es null
          parsedResult[key] = value !== undefined ? value : null; // Asignamos null si el valor es undefined
        }
      }
    }

    return parsedResult;
  }

  loadOpportunities(event: any) {
    const page = event.first / event.rows; // PrimeNG usa índices basados en 'first'
    const size = event.rows;

    //const sortField = event.sortField;
    const sortOrder = this.sortOrder === 1 ? 'ASC' : 'DESC';

    //console.log('filters', this.filters); // Muestra el resultado en consola
    //console.log('prime', this.primeFilters); // Muestra el resultado en consola
    //console.log('parsed', this.parseData(this.primeFilters)); // Muestra el resultado en consola

    this.filters = {
      ...this.filters,
      ...this.parseData(this.primeFilters),
    };

    console.log('MERGED', this.filters); // Muestra el resultado en consola
    this.opportunityService
      .getOpportunities(page, size, this.filters, this.sortField, sortOrder)
      .subscribe((data) => {
        this.opportunities = data.items;
        // Acumula las nuevas oportunidades
        this.loadStateSummary(data.stateSummary);
        this.totalRecords = data.total;
        this.opportunities.forEach((opp) => {
          opp.oppSfaDateCreation = new Date(opp.oppSfaDateCreation);
          opp.createdAt = new Date(opp.createdAt);
          opp.updatedAt = new Date(opp.updatedAt);
          opp.estimatedClosingDate = new Date(opp.estimatedClosingDate);
          if (opp.nextInteraction) {
            opp.nextInteraction = new Date(opp.nextInteraction);
          }
        });
      });
  }

  refreshOpportunityTable() {
    if (this.dataTable) this.dataTable.first = 0;
    this.loadOpportunities({ first: 0, rows: 10 }); //recargar datos
  }

  loadStateSummary(stateSummary: any) {
    // Actualizar los valores de stateCounts
    this.stateCounts = stateSummary;

    // Sincronizar los valores con opportunityStateSummary
    this.opportunityStateSummary = [
      { sigla: 'NC', count: this.stateCounts['No contactado'] },
      { sigla: 'PO', count: this.stateCounts.Potenciales },
      { sigla: 'PR', count: this.stateCounts.Prospecto },
      { sigla: 'PC', count: this.stateCounts['Prospecto calificado'] },
      { sigla: 'PD', count: this.stateCounts['Prospecto desarrollado'] },
      { sigla: 'C', count: this.stateCounts.Cierre },
      { sigla: 'NoC', count: this.stateCounts['No cierre'] },
    ];
  }
  getGroupedUserIds(): any[] {
    return this.groupedUsers
      .flatMap((group) => group.items) // Aplana todos los items de cada grupo
      .map((item) => item.value); // Extrae el valor de cada item
  }

  onAsignedUsersChanged(selectedItems: any[]): void {
    if (selectedItems.length === 0) {
      this.filters = {
        ...this.filters,
        user: {
          value: this.getGroupedUserIds(),
        },
      };
    } else {
      this.selectedUsers = selectedItems;
      this.filters = {
        ...this.filters,
        user: {
          value: selectedItems,
        },
      };
    }
  }
}
