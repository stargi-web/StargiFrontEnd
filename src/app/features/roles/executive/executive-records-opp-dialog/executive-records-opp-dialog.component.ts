import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OpportunityRecordModel } from '../../../../core/models/opportunityRecordMode';
import { OpportunityRecordService } from '../../../../core/services/nestjs-services/opportunityRecordService';
@Component({
  selector: 'app-executive-records-opp-dialog',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './executive-records-opp-dialog.component.html',
  styleUrl: './executive-records-opp-dialog.component.css',
})
export class ExecutiveRecordsOppDialogComponent implements OnInit {
  oppId!: number;
  records!: OpportunityRecordModel[];
  loading = true;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private recordService: OpportunityRecordService
  ) {}
  ngOnInit(): void {
    this.oppId = this.config.data?.oppId;
    this.loadRecords();
  }
  loadRecords() {
    this.recordService.getRecordsByOppId(this.oppId).subscribe({
      next: (response) => {
        this.records = response;
        this.loading = false;
      },
      error: (error) => console.error(error),
    });
  }
}
