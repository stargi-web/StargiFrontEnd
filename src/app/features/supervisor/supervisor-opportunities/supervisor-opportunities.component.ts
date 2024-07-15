import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OpportunityService } from '../../../services/opportunityService';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-supervisor-opportunities',
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './supervisor-opportunities.component.html',
  styleUrl: './supervisor-opportunities.component.css'
})
export class SupervisorOpportunitiesComponent implements OnInit{
  opportunities!:OpportunityModel[];
  loading=true;
  constructor(private opportunityService:OpportunityService){}
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
}
