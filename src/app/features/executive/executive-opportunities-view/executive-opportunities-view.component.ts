import { Component, OnInit } from '@angular/core';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { CommonModule } from '@angular/common';
import { OpportunityService } from '../../../services/opportunityService';
import { response } from 'express';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { OpportunityFilters } from '../../../core/models/filters';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-executive-opportunities-view',
  standalone: true,
  imports: [CommonModule,InputNumberModule,DropdownModule,FormsModule,ButtonModule],
  templateUrl: './executive-opportunities-view.component.html',
  styleUrl: './executive-opportunities-view.component.css'
})
export class ExecutiveOpportunitiesViewComponent implements OnInit{
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  opportunities!:OpportunityModel[];
  pageSizeOptions = [{ label: '10', value: 10 }, { label: '15', value: 15 }, { label: '20', value: 20 }];
  filters: OpportunityFilters = {};
  constructor(private opportunityService:OpportunityService){}
  ngOnInit(): void {
    this.loadOpporunities();
  }
  updatePage() {
    this.loadOpporunities();
  }
  loadOpporunities(){
    this.opportunityService.getAllOpportunitiesPaginated(this.currentPage,this.pageSize,this.filters).subscribe(
      {
        next:response=>{
          this.totalPages=response.totalPages;
          this.opportunities=response.data;
        }
      }
    )
  }
  applyFilters() {
    const filtersToApply: OpportunityFilters = {};

  if (this.filters.ruc && this.filters.ruc.trim() !== '') {
    filtersToApply.ruc = this.filters.ruc;
  }
  
  if (this.filters.businessName && this.filters.businessName.trim() !== '') {
    filtersToApply.businessName = this.filters.businessName;
  }

  this.filters = filtersToApply;
  this.currentPage = 1;  
  this.loadOpporunities();
  }
  

}
