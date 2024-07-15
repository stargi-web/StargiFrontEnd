import { OpportunityService } from '../../../services/opportunityService';
import { OpportunityModel } from './../../../core/models/opportunityModel';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-supervisor-team-opportunities',
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './supervisor-team-opportunities.component.html',
  styleUrl: './supervisor-team-opportunities.component.css'
})
export class SupervisorTeamOpportunitiesComponent implements OnInit{
  opportunities!:OpportunityModel[];
  teamId!:number
  loading=true;
  constructor(private opportunityService:OpportunityService){}
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

}
