import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { OpportunityService } from '../../../services/opportunityService';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OpportunityRecordService } from '../../../services/opportunityRecordService';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExecutiveRecordsOppDialogComponent } from '../../executive/executive-records-opp-dialog/executive-records-opp-dialog.component';
import { ConfirmDeleteOpportunityDialogComponent } from '../../../shared/components/confirm-delete-opportunity-dialog/confirm-delete-opportunity-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { opportunityTypes, products, productTypes, states } from '../../../shared/const/constantes';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-admin-user-opp',
  providers:[DialogService],
  standalone: true,
  imports: [InputTextModule,DropdownModule,FormsModule,CalendarModule,InputNumberModule,TableModule,CommonModule],
  templateUrl: './admin-user-opp.component.html',
  styleUrl: './admin-user-opp.component.css'
})
export class AdminUserOppComponent implements OnInit{
  editingRowIndex: number | null = null;
  urgentOpportunitiesCount: number = 0;
  sort=-1
  opportunities!:OpportunityModel[];
  loading=true;
  userId?:number;
  opportunityTypes=opportunityTypes;
  products=products;
  productTypes=productTypes;
  states=states;
  constructor(public dialogService:DialogService,private route:ActivatedRoute,private opportunityService:OpportunityService,private oppRecordService:OpportunityRecordService){}
  ref:DynamicDialogRef|undefined;
  ngOnInit(): void {
    this.userId=Number(this.route.snapshot.paramMap.get('userId'));
    this.loadOpportunities();
  }
  loadOpportunities(){
    if(this.userId)
    this.opportunityService.getOpportunitiesByUserId(this.userId).subscribe({
      next:response=>{
        this.opportunities=response;
        this.opportunities.forEach(opp=>{
          opp.oppSfaDateCreation=new Date(opp.oppSfaDateCreation);
          opp.createdAt=new Date(opp.createdAt);
          opp.updatedAt=new Date(opp.updatedAt);
          opp.estimatedClosingDate=new Date(opp.estimatedClosingDate);
        })
        this.loading=false;
      },error:error=>console.error(error)
    })
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
      newUnits: opportunity.units,  // Puedes ajustar este valor según sea necesario
      newState: opportunity.state,
      newCommentary: opportunity.commentary,
      contactName: opportunity.contactName || '',
      contactNumber: opportunity.contactNumber || '',
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
  openRecordsDialog(oppId:number) {
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
