import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OpportunityService } from '../../../services/opportunityService';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExecutiveRecordsOppDialogComponent } from '../../executive/executive-records-opp-dialog/executive-records-opp-dialog.component';
@Component({
  selector: 'app-admin-view-team-opportunities',
  providers:[DialogService],
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './admin-view-team-opportunities.component.html',
  styleUrl: './admin-view-team-opportunities.component.css'
})
export class AdminViewTeamOpportunitiesComponent implements OnInit{
loading=true;

  opportunities!:OpportunityModel[];
  teamId!:number;
  constructor(public dialogService:DialogService,private opportunityService:OpportunityService,private route:ActivatedRoute){}
  ref:DynamicDialogRef|undefined;
  ngOnInit(): void {
    this.teamId=Number(this.route.snapshot.paramMap.get('teamId'));
    this.loadOpportunities();
  }
  loadOpportunities(){
    this.opportunityService.getOpportunitiesByTeamId(this.teamId).subscribe(
      {
        next:response=>{
          this.opportunities=response;
          this.loading=false;
        },
        error:error=>console.error(error)
      }
    )
  }
  openRecordsDialog(oppId: number) {
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
