import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { OpportunityService } from '../../../services/opportunityService';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OpportunityRecordService } from '../../../services/opportunityRecordService';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExecutiveRecordsOppDialogComponent } from '../../executive/executive-records-opp-dialog/executive-records-opp-dialog.component';
@Component({
  selector: 'app-admin-user-opp',
  providers:[DialogService],
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './admin-user-opp.component.html',
  styleUrl: './admin-user-opp.component.css'
})
export class AdminUserOppComponent implements OnInit{


  opportunities!:OpportunityModel[];
  loading=true;
  userId?:number;
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

  openRecordsDialog(oppId:number) {
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
