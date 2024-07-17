import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-confirm-delete-opportunity-dialog',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './confirm-delete-opportunity-dialog.component.html',
  styleUrl: './confirm-delete-opportunity-dialog.component.css'
})
export class ConfirmDeleteOpportunityDialogComponent implements OnInit{
  bussinesName!:string;
  constructor(private ref:DynamicDialogRef,private config:DynamicDialogConfig,){}
  ngOnInit(): void {
    this.bussinesName=this.config.data?.bussinesName;
  }
  confirm(){
    this.ref.close(true);
  }
  cancel(){
    this.ref.close(false);
  }
}
