import { config } from './../../../app.config.server';
import { InputNumberModule } from 'primeng/inputnumber';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OpportunityService } from '../../../services/opportunityService';
import { ExecutiveEditOpportunityComponent } from "../executive-edit-opportunity/executive-edit-opportunity.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExecutiveRecordsOppDialogComponent } from '../executive-records-opp-dialog/executive-records-opp-dialog.component';
import { ConfirmDeleteOpportunityDialogComponent } from '../../../shared/components/confirm-delete-opportunity-dialog/confirm-delete-opportunity-dialog.component';
@Component({
  selector: 'app-executive-dashboard',
  providers:[DialogService],
  standalone: true,
  imports: [InputNumberModule,TableModule, DropdownModule, FormsModule, CommonModule, ButtonModule, ExecutiveEditOpportunityComponent],
  templateUrl: './executive-dashboard.component.html',
  styleUrl: './executive-dashboard.component.css'
})
export class ExecutiveDashboardComponent implements OnInit {


  opportunities!:OpportunityModel[];
  editingRowIndex: number | null = null;
  loading: boolean=true;
  states = [
    { label: 'No contactado', value: 'No contactado' },
    { label: 'Potenciales', value: 'Potenciales' },
    { label: 'Prospecto', value: 'Prospecto' },
    { label: 'Prospecto calificado', value: 'Prospecto calificado' },
    { label: 'Prospecto desarrollado', value: 'Prospecto desarrollado' },
    { label: 'Cierre', value: 'Cierre' },
    { label: 'No cierre', value: 'No cierre' }
  ];
  constructor(public dialogService:DialogService,private opportunityService:OpportunityService){}
  ref:DynamicDialogRef|undefined;
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
                })
            },error:error=>{console.error(error)}
        }
    )
  }
  startEditing(rowIndex: number) {
    this.editingRowIndex = rowIndex;
  }

  saveChanges(oppId:number,newState:string,newCommentary:string,contactName:string,contactNumber:string,amount:number) {
    this.opportunityService.editOpportunity({oppId,newState,newCommentary,contactName,contactNumber,amount}).subscribe(
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
