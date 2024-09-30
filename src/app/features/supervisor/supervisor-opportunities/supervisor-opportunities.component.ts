import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OpportunityService } from '../../../services/opportunityService';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ExecutiveRecordsOppDialogComponent } from '../../executive/executive-records-opp-dialog/executive-records-opp-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-supervisor-opportunities',
  standalone: true,
  providers:[DialogService],
  imports: [TableModule,CommonModule,ButtonModule,InputNumberModule,DropdownModule,FormsModule],
  templateUrl: './supervisor-opportunities.component.html',
  styleUrl: './supervisor-opportunities.component.css'
})
export class SupervisorOpportunitiesComponent implements OnInit{
  opportunities!:OpportunityModel[];
  loading=true;
  opportunityTypes = [
    { label: 'Básico', value: 'Básico' },
    { label: 'Estandar', value: 'Estandar' },
    { label: 'No estandar', value: 'No estandar' }
  ];
  products = [
    { label: 'DBI-Fibra Óptica', value: 'DBI-Fibra Óptica' },
    { label: 'DBI-Radio Enlace', value: 'DBI-Radio Enlace' },
    { label: 'DBI-GPON', value: 'DBI-GPON' },
    { label: 'Nube Pública', value: 'Nube Pública' },
    { label: 'Antivirus', value: 'Antivirus' },
    { label: 'Cloud Backup', value: 'Cloud Backup' },
    { label: 'Central telefónica', value: 'Central telefónica' },
    { label: 'Otros', value: 'Otros' }
  ];
  states = [
    { label: 'Potenciales', value: 'Potenciales' },
    { label: 'Prospecto', value: 'Prospecto' },
    { label: 'Prospecto calificado', value: 'Prospecto calificado' },
    { label: 'Prospecto desarrollado', value: 'Prospecto desarrollado' },
    { label: 'Cierre', value: 'Cierre' },
    { label: 'No cierre', value: 'No cierre' }]
  editingRowIndex: number | null = null;
  ref:DynamicDialogRef|undefined;
  opportunityStateSummary: { sigla: string, count: number }[] = [];
  totalOpportunities = 0;
  constructor(public dialogService:DialogService,private opportunityService:OpportunityService){}
  ngOnInit(): void {
    
    this.loadOpportunities();
  }
  loadOpportunities(){
    const userId=Number(sessionStorage.getItem("userId"));
    this.opportunityService.getOpportunitiesByUserId(userId).subscribe(
      {
        next:response=>{
          this.opportunities=response;
          this.loading=false;
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
        }
      }
    )
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
  startEditing(rowIndex: number) {
    this.editingRowIndex = rowIndex;
  }

  saveChanges(oppId:number,newState:string,newCommentary:string,contactName:string,contactNumber:string,amount:number,product:string,type:string) {
    const userId=Number(sessionStorage.getItem('userId'))
    this.opportunityService.editOpportunity({oppId,newState,newCommentary,contactName,contactNumber,amount,product,type,userId}).subscribe(
      {
        next:response=>{
          alert(`${response.message}`);
          this.editingRowIndex=null;
        },
        error:error=>{console.error(error);this.editingRowIndex = null;}
        
      }
    );
    
  }

  cancelEditing() {
    this.editingRowIndex = null;
  }
  openRecordsDialog(oppId:number){
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
