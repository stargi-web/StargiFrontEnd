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
        }
      }
    )
  }
  startEditing(rowIndex: number) {
    this.editingRowIndex = rowIndex;
  }

  saveChanges(oppId:number,newState:string,newCommentary:string,contactName:string,contactNumber:string,amount:number,product:string,type:string) {
    this.opportunityService.editOpportunity({oppId,newState,newCommentary,contactName,contactNumber,amount,product,type}).subscribe(
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
