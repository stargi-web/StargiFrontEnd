import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OpportunityService } from '../../../services/opportunityService';
@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [TableModule,DropdownModule,FormsModule,CommonModule ],
  templateUrl: './executive-dashboard.component.html',
  styleUrl: './executive-dashboard.component.css'
})
export class ExecutiveDashboardComponent implements OnInit {
  opportunities!:OpportunityModel[];
 
  loading: boolean=true;
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
            },error:error=>{console.error(error)}
        }
    )
  }

}
