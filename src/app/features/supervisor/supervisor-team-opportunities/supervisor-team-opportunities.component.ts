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
@Component({
  selector: 'app-supervisor-team-opportunities',
  standalone: true,
  providers:[DialogService],
  imports: [TableModule,CommonModule,ButtonModule,InputNumberModule,DropdownModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './supervisor-team-opportunities.component.html',
  styleUrl: './supervisor-team-opportunities.component.css'
})
export class SupervisorTeamOpportunitiesComponent implements OnInit{
  opportunities!:OpportunityModel[];
  teamId!:number
  editingRowIndex: number | null = null;
  loading=true;
  states = [
    { label: 'Potenciales', value: 'Potenciales' },
    { label: 'Prospecto', value: 'Prospecto' },
    { label: 'Prospecto calificado', value: 'Prospecto calificado' },
    { label: 'Prospecto desarrollado', value: 'Prospecto desarrollado' },
    { label: 'Cierre', value: 'Cierre' },
    { label: 'No cierre', value: 'No cierre' }
  ];
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
  constructor(public dialogService:DialogService,private opportunityService:OpportunityService){}
  ref:DynamicDialogRef|undefined;
  ngOnInit(): void {
    this.teamId=Number(sessionStorage.getItem("teamId"));
    this.loadOpportunities();
  }
  loadOpportunities(){
    if(this.teamId){
      this.opportunityService.getOpportunitiesByTeamId(this.teamId).subscribe(
        {
          next:response=>{
            console.log(response);
            
            this.opportunities=response;
            this.loading=false;
          },
          error:error=>{
            console.error(error);
          }
        }
      )
    }
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


