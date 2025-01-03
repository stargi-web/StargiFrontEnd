import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { OpportunityService } from '../../../core/services/nestjs-services/opportunityService';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.css',
})
export class DeleteUserDialogComponent {
  userId!: number;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private opportunityService: OpportunityService
  ) {
    this.userId = this.config.data?.userId;
  }

  confirm() {
    this.opportunityService.deleteUser(this.userId).subscribe({
      next: (response) => {
        alert('Usuario eliminado');
        this.ref.close(true);
      },
      error: (error) => {
        alert('Error');
        console.error(error);
        this.ref.close(false);
      },
    });
  }
  cancel() {
    this.ref.close(false);
  }
}
