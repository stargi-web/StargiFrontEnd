import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-justification-dialog',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './justification-dialog.component.html',
  styleUrl: './justification-dialog.component.css'
})
export class JustificationDialogComponent {
  user: any;
  date?: Date;
  attendanceId?: number;

  constructor(private ref: DynamicDialogRef,public config: DynamicDialogConfig) {
    this.user = this.config.data.user;
    this.date = this.config.data.date;
    this.attendanceId = this.config.data.attendanceId;
  }

  confirm(): void {
    this.ref.close(true); 
  }

  cancel(): void {
    this.ref.close(false); 
  }
}
