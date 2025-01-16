import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-custom-confirm-dialog',
  standalone: true,
  imports: [ConfirmDialogModule],
  templateUrl: './custom-confirm-dialog.component.html',
  styleUrl: './custom-confirm-dialog.component.css',
  providers: [ConfirmationService], // Agregar aquí el proveedor
})
export class CustomConfirmDialogComponent {
  @Input() message: string = '';
  @Input() header: string = '';
  @Input() icon: string = '';
  @Input() acceptButtonStyleClass: string = '';
  @Input() rejectButtonStyleClass: string = '';
  @Output() onAccept: EventEmitter<void> = new EventEmitter();
  @Output() onReject: EventEmitter<void> = new EventEmitter();

  constructor(private confirmationService: ConfirmationService) {}

  open(event: Event) {
    setTimeout(() => {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: this.message,
        header: this.header,
        icon: this.icon,
        acceptButtonStyleClass: this.acceptButtonStyleClass,
        rejectButtonStyleClass: this.rejectButtonStyleClass,
        accept: () => {
          this.onAccept.emit();
        },
        reject: () => {
          this.onReject.emit();
        },
      });
    }, 10);
  }
}
