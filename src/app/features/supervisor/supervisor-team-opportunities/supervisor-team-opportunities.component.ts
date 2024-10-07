import { OpportunityService } from '../../../services/opportunityService';
import { OpportunityModel } from './../../../core/models/opportunityModel';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDeleteOpportunityDialogComponent } from '../../../shared/components/confirm-delete-opportunity-dialog/confirm-delete-opportunity-dialog.component';
import { ExecutiveRecordsOppDialogComponent } from '../../executive/executive-records-opp-dialog/executive-records-opp-dialog.component';
import { opportunityTypes, products, productTypes, states } from '../../../shared/const/constantes';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-supervisor-team-opportunities',
  standalone: true,
  providers:[DialogService],
  imports: [CalendarModule,InputTextModule,TableModule,CommonModule,ButtonModule,InputNumberModule,DropdownModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './supervisor-team-opportunities.component.html',
  styleUrl: './supervisor-team-opportunities.component.css'
})
export class SupervisorTeamOpportunitiesComponent implements OnInit{
  private readonly NEAR_CLOSING_DAYS = 7;

  opportunities!:OpportunityModel[];
  teamId!:number
  editingRowIndex: number | null = null;
  loading=true;
  states = states;
  productTypes=productTypes;
  opportunityTypes = opportunityTypes;
  products = products;
  constructor(public dialogService:DialogService,private opportunityService:OpportunityService){}
  ref:DynamicDialogRef|undefined;
  urgentOpportunitiesCount: number = 0;
  opportunityStateSummary: { sigla: string, count: number }[] = [];
  totalOpportunities = 0;
  ngOnInit(): void {
    this.productTypes=productTypes;
    this.teamId=Number(sessionStorage.getItem("teamId"));
    this.loadOpportunities();
    
  }
  calculateOpportunityStateSummary() {
    const stateCounts ={
      "No contactado":0,
      "Potenciales":0,
      "Prospecto":0,
      "Prospecto calificado":0,
      "Prospecto desarrollado":0,
      "Cierre":0,
      "No cierre":0
    };

    this.opportunities.forEach(opportunity => {
      stateCounts[opportunity.state as keyof typeof stateCounts]++;
    });

    this.opportunityStateSummary = [
      { sigla: 'NC', count: stateCounts['No contactado'] },
      { sigla: 'PO', count: stateCounts.Potenciales },
      { sigla: 'PR', count: stateCounts.Prospecto },
      { sigla: 'PC', count: stateCounts['Prospecto calificado'] },
      { sigla: 'PD', count: stateCounts['Prospecto desarrollado'] },
      { sigla: 'C', count: stateCounts.Cierre },
      { sigla: 'NoC', count: stateCounts['No cierre'] }
    ];

    this.totalOpportunities = this.opportunities.length;
  }
  loadOpportunities(){
    if(this.teamId){
      this.opportunityService.getOpportunitiesByTeamId(this.teamId).subscribe(
        {
          next:response=>{
            console.log(response);
            
            this.opportunities=response;
            this.opportunities.forEach(opp=>{
              opp.oppSfaDateCreation=new Date(opp.oppSfaDateCreation);
              opp.createdAt=new Date(opp.createdAt);
              opp.updatedAt=new Date(opp.updatedAt);
              opp.estimatedClosingDate=new Date(opp.estimatedClosingDate);
              if(opp.nextInteraction){
                opp.nextInteraction=new Date(opp.nextInteraction);
              }
            })
            this.calculateOpportunityStateSummary();
            this.loading=false;
            
            this.calculateUrgentOpportunities();
          },
          error:error=>{
            console.error(error);
          }
        }
      )
    }
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
    this.urgentOpportunitiesCount = this.opportunities.filter(opportunity => {
      const estimatedClosingDate = new Date(opportunity.estimatedClosingDate);
      const timeDiff = estimatedClosingDate.getTime() - today.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return dayDiff <= 5;
    }).length;
  }
  getRowClass(opportunity: any): string {
    const today = new Date();
    const oppSfaDateCreation = new Date(opportunity.oppSfaDateCreation);
    const dayDiff = Math.ceil((today.getTime() - oppSfaDateCreation.getTime()) / (1000 * 3600 * 24));

    if (dayDiff > 28) {
      return 'red-row';
    } else if (dayDiff > 25) {
      return 'yellow-row';
    } else {
      return '';
    }
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
      productType:opportunity.productType,
      otherDetails: opportunity.otherDetails,
      amount: opportunity.amount!,
      newClosingDate: opportunity.estimatedClosingDate,
      newUnits: opportunity.units,  
      newState: opportunity.state,
      newCommentary: opportunity.commentary,
      contactName: opportunity.contactName || '',
      contactNumber: opportunity.contactNumber || '',
      nextInteraction:opportunity.nextInteraction,
      userId:Number(sessionStorage.getItem('userId'))
    };
  
    this.opportunityService.editOpportunity(editCommand).subscribe(
      {
        next: response => {
          alert(`${response.message}`);
          this.editingRowIndex = null;
          this.loadOpportunities();  // Recargar la lista de oportunidades
        },
        error: error => {
          console.error(error);
          this.editingRowIndex = null;
        }
      }
    );
  }

  cancelEditing() {
    this.editingRowIndex = null;
  }
  deleteOpportunity(name: string,id:number) {
    const config={
      data:{
        bussinesName:name
      },
      Headers:'Confimar eliminacion'
    }
    this.ref=this.dialogService.open(ConfirmDeleteOpportunityDialogComponent,config);
    this.ref.onClose.subscribe((response:boolean)=>{
      if(response){
        this.opportunityService.deleteOpportunity(id).subscribe(
          {
            next:response=>{
              this.opportunities=this.opportunities.filter(o=>o.id!==id);
            },error:error=>{
              console.error(error);
            }
          }
        )
      }
    })
  }
  openRecordsDialog(oppId:number){
    if(this.editingRowIndex==null){
      const config={
        data:{
          oppId
        },
        Headers:'Historial de cambios',
        with:'60vw',
      }
      this.ref=this.dialogService.open(ExecutiveRecordsOppDialogComponent,config);
    }
    
  }
}


